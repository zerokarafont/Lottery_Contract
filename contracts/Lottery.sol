// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import './library/Strings.sol';
import './VRFv2Consumer.sol';

interface IERC20 {
  function transferFrom(
    address from,
    address to,
    uint256 value
  ) external returns (bool);

  function approve(address spender, uint256 value) external returns (bool);

  function balanceOf(address who) external view returns (uint256);

  function transfer(address to, uint256 amount) external returns (bool);
}

contract Lottery {
  event Buy(address player, string number, uint256 amounts);
  event Start(uint256 time, string unit);
  event DrawPrize(
    uint256 round,
    string indexed number,
    address[] indexed winners
  );

  bool locked;
  address public VRF;
  address constant DAI = 0x5eD8BD53B0c3fa3dEaBd345430B1A3a6A4e8BD7C;
  address public admin;

  // 对外不可见
  address[] internalWinners; // 暂存中奖彩民地址
  uint256[] internalAmounts; // 暂存中奖彩民的下注数

  // 往期中奖记录
  mapping(uint256 => WinningRecord) winningRecords;

  enum Lottery_State {
    CLOSED,
    OPEN,
    CALCULATING_WINNER
  }

  // 中奖记录
  struct WinningRecord {
    // 中奖号码
    string number;
    // 中奖地址
    address[] winnerList;
  }
  // 购买订单
  struct Order {
    // 彩民地址
    address player;
    // 下注号码
    string number;
    // 下注数量
    uint256 amounts;
  }
  struct Activity {
    // 期数
    uint256 round;
    // 奖池金额 (货币: DAI)
    uint256 poolBalance;
    // 总下注数
    uint256 totalAmounts;
    // 开奖时间
    uint256 time;
    // 开奖号码
    string number;
    // 活动状态
    Lottery_State state;
    // 是否已经开过将，如果开奖没有任何人中奖，管理员可以重复抽，直到有人中奖设为true
    bool isAlreadyDistributed;
    // {参加者 ,下注号码, 下注数量 }
    Order[] participantRecord;
  }

  Activity act;

  constructor() {
    admin = msg.sender;
  }

  modifier onlyAdmin() {
    require(msg.sender == admin, 'you are not admin');
    _;
  }

  modifier onlyParticipant() {
    require(msg.sender != admin, 'admin is not allowed');
    _;
  }

  modifier nonReentrant() {
    require(!locked, 'ReentrancyGuard: reentrant call');

    locked = true;
    _;
    locked = false;
  }

  function changeAdmin(address _newAdmin) public onlyAdmin {
    admin = _newAdmin;
  }

  /**
    @dev 管理员发起一个彩票活动
    @param time 从当前时间往后多长时间
    @param unit 时间单位
   */
  function startActivity(uint256 time, string memory unit) public onlyAdmin {
    // 检查当前是否存在正在进行的活动
    require(block.timestamp > act.time, 'current activity is not over yet');
    // 检查当前活动状态
    require(
      act.state == Lottery_State.CLOSED,
      'current activity is wrong status'
    );

    uint256 newTime;

    if (Strings.equals(unit, 's')) {
      newTime = block.timestamp + time;
    } else if (Strings.equals(unit, 'm')) {
      newTime = block.timestamp + time * 1 minutes;
    } else if (Strings.equals(unit, 'h')) {
      newTime = block.timestamp + time * 1 hours;
    } else if (Strings.equals(unit, 'd')) {
      newTime = block.timestamp + time * 1 days;
    } else {
      revert('wrong time unit');
    }

    // 期数+1
    act.round++;
    // 设置开奖时间
    act.time = newTime;
    // 设置活动状态
    act.state = Lottery_State.OPEN;
    // 将中奖号码重置为初始状态
    // act.number = 0;
    delete act.number; // gas saving
    // 将参加者重置为初始状态
    delete act.participantRecord;
    // 重置奖池金额
    delete act.poolBalance;
    // 重置下注数量
    delete act.totalAmounts;
    // 重置奖池派发状态
    delete act.isAlreadyDistributed;

    emit Start(time, unit);
  }

  /**
    @dev 下注 (购买彩票)
    @param number 下注号码
    @param amounts 注数
    note 对于涉及转账的操作一律加上重入锁，防止意外的安全问题 
   */
  function buy(string memory number, uint256 amounts)
    public
    onlyParticipant
    nonReentrant
  {
    // 确保活动没有超时
    require(block.timestamp <= act.time, 'exceed buy time');
    // 确保开奖号码还没有产生
    require(
      bytes(act.number).length == 0,
      'current activity number must be null'
    );
    // 检查活动状态
    require(
      act.state == Lottery_State.OPEN,
      'current activity status exception'
    );
    // 至少下一注
    require(amounts > 0, 'amounts at least 1');

    uint256 requiredDAIs = 5 * amounts * 10**18;
    // 检查余额
    require(
      IERC20(DAI).balanceOf(msg.sender) >= requiredDAIs,
      'Insufficient balance'
    );
    bool sent = IERC20(DAI).transferFrom(
      msg.sender,
      address(this),
      requiredDAIs
    );
    require(sent, 'transfer failed');

    // 保存购买记录
    act.participantRecord.push(Order(msg.sender, number, amounts));

    // 累计奖池金额
    act.poolBalance += requiredDAIs;
    // 累计下注数量
    act.totalAmounts += amounts;

    emit Buy(msg.sender, number, amounts);
  }

  /**
        @dev 开奖 
        这里没有限制管理员开奖的次数，如果开出的号码没人中奖，管理员可以继续开奖
        @return bool 如果有人中奖返回true, 否则返回false
     */
  function drawPrize() public onlyAdmin nonReentrant returns (bool) {
    // 确保已经到了开奖时间
    require(
      block.timestamp > act.time,
      'The lottery time has not been reached'
    );
    // 确保奖池还没有被分发
    require(!act.isAlreadyDistributed, 'Prizes have been distributed');
    // 确保活动没有关闭
    require(act.state != Lottery_State.CLOSED, 'Activity has been closed');

    // 设置状态为抽奖中，此时不能再进行买入操作
    act.state = Lottery_State.CALCULATING_WINNER;

    uint256 rawRandom = generateVRFRandom();
    // 开奖号码
    string memory prizeNumber = paddingZero(rawRandom);
    act.number = prizeNumber;

    // 寻找中奖者
    bool existWinner;
    for (uint256 i = 0; i < act.participantRecord.length; i++) {
      Order memory _ord = act.participantRecord[i];
      if (!Strings.equals(_ord.number, prizeNumber)) {
        continue;
      }
      existWinner = true;
      internalWinners[i] = _ord.player;
      internalAmounts[i] = _ord.amounts;
    }
    if (existWinner) {
      // 记录中奖信息
      winningRecords[act.round] = WinningRecord(act.number, internalWinners);
      // 分发奖池
      uint256 poolBalance = act.poolBalance;
      // 扣除20%手续费
      uint256 actualDistrubuteBalance = (poolBalance * 80) / 100;
      // 将奖金转给中奖者
      for (uint256 i = 0; i < internalWinners.length; i++) {
        address _winner = internalWinners[i];
        uint256 _amount = internalAmounts[i];
        if (_winner != address(0) && _amount != 0) {
          bool sent = IERC20(DAI).transfer(
            _winner,
            (actualDistrubuteBalance * _amount) / act.totalAmounts
          );
          require(sent, 'transfer failed');
        }
      }

      // 更新状态
      act.isAlreadyDistributed = true;
      act.state = Lottery_State.CLOSED;

      // 重置暂存的中奖人信息
      delete internalWinners;
      delete internalAmounts;

      emit DrawPrize(act.round, act.number, internalWinners);

      return true;
    }
    return false;
  }

  /**
    @dev 管理员结束抽奖活动
   */
  function closeDraw() public onlyAdmin {
    require(
      act.state == Lottery_State.CALCULATING_WINNER,
      'cannot close wrong status'
    );
    act.state = Lottery_State.CLOSED;
  }

  /**
    @dev 查询活动信息
   */
  function queryActivityInfo() public view returns (Activity memory) {
    return act;
  }

  /**
   @dev 查询某一期的中奖记录
   @param round 期数
   @return number 开奖号码
   @return winners 中奖地址
   */
  function queryPrizeHistory(uint256 round)
    public
    view
    returns (string memory number, address[] memory winners)
  {
    WinningRecord memory _record = winningRecords[round];
    number = _record.number;
    winners = _record.winnerList;
  }

  /**
      @dev 使用Chainlink 生成安全的随机数
     */
  function generateVRFRandom() private returns (uint256) {
    require(VRF != address(0), 'VRF address cannot be null');

    VRFv2Consumer _vrf = VRFv2Consumer(VRF);
    _vrf.requestRandomWords();
    return _vrf.s_randomValue();
  }

  /**
    设置chainlink VRF合约地址
   */
  function instantiateVRF(uint64 subscriptionID) public onlyAdmin {
    VRFv2Consumer _vrf = new VRFv2Consumer(subscriptionID);
    VRF = address(_vrf);
  }

  /**
    @dev 如果数字不足4位数，前缀补0，例如 0012 0239
    */
  function paddingZero(uint256 num) private pure returns (string memory) {
    // require(num > 0, 'wrong random value');
    require(num < 10000, 'exceed maximum random');

    if (num > 999) {
      return Strings.toString(num);
    } else if (num > 99) {
      return string(bytes.concat(bytes('0'), bytes(Strings.toString(num))));
    } else if (num > 9) {
      return string(bytes.concat(bytes('00'), bytes(Strings.toString(num))));
    } else {
      return string(bytes.concat(bytes('000'), bytes(Strings.toString(num))));
    }
  }

  /**
    @dev 生成一个不安全的4位随机号码
    @param seeds 四个随机地址作为种子
    note Deprecated 改用Chainlink VRF
   */
  function generateUnsafeRandomNumber(address[4] memory seeds)
    private
    view
    returns (string[4] memory)
  {
    string[4] memory _result;
    for (uint256 i = 0; i < seeds.length; i++) {
      uint8 a = uint8(
        uint256(
          keccak256(
            abi.encodePacked(block.difficulty, block.timestamp, seeds[i])
          )
        )
      ) % 10;
      _result[i] = Strings.toString(a);
    }
    return _result;
  }
}
