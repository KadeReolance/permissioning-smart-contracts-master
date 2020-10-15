const BN = web3.utils.BN;
const RulesList = artifacts.require('ExposedAccountRulesList.sol');

var address1 = "0xdE3422671D38EcdD7A75702Db7f54d4b30C022Ea".toLowerCase();
var address2 = "0xf17f52151EbEF6C7334FAD080c5704D77216b732".toLowerCase();
var address3 = "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73".toLowerCase();

contract("AccountRulesList (list manipulation)", async () => {

  let rulesListContract;

  beforeEach(async () => {
    rulesListContract = await RulesList.new();
  });

  it("should start with an empty list of rules", async () => {
    let size = await rulesListContract._size();

    assert.equal(size, 0);
  });

  it("size method reflect list size", async () => {
    await rulesListContract._add(address1);
    await rulesListContract._add(address2);
    await rulesListContract._add(address3);

    let size = await rulesListContract._size();
    assert.equal(size, 3);
  });

  it("exists should return true for existing address", async () => {
    await rulesListContract._add(address1);

    let exists = await rulesListContract._exists(address1);

    assert.ok(exists);
  });

  it("exists should return false for absent address", async () => {
    // adding another address so list is not empty
    await rulesListContract._add(address3);

    let exists = await rulesListContract._exists(address2);

    assert.notOk(exists);
  });

  it("exists should return false when list is empty", async () => {
    let exists = await rulesListContract._exists(address1);

    assert.notOk(exists);
  });

  it("add address to list should add to the list and increase list size", async () => {
    let exists = await rulesListContract._exists(address3);
    assert.notOk(exists);
    let size = await rulesListContract._size();
    assert.equal(size, 0);

    await rulesListContract._add(address3);

    exists = await rulesListContract._exists(address3);
    assert.ok(exists);
    size = await rulesListContract._size();
    assert.equal(size, 1);
  });

  it("add multiple addresses to list should add to the list and increase list size", async () => {
    let exists = await rulesListContract._exists(address3);
    assert.notOk(exists);
    let size = await rulesListContract._size();
    assert.equal(size, 0);

    let addresses = [address1, address2, address3];
    await rulesListContract._addAll(addresses);

    exists = await rulesListContract._exists(address3);
    assert.ok(exists);
    size = await rulesListContract._size();
    assert.equal(size, 3);
  });

  it("add existing address should do nothing on second insert", async () => {
    await rulesListContract._add(address3);
    await rulesListContract._add(address3);

    let size = await rulesListContract._size();
    assert.equal(size, 1);

    let exists = await rulesListContract._exists(address3);
    assert.ok(exists);
  });

  it("remove absent address should not fail", async () => {
    let txResult = await rulesListContract._remove(address3);

    assert.ok(txResult.receipt.status);
  });

  it("remove address from list should remove from list and decrease list size", async () => {
    await rulesListContract._add(address2);
    let size = await rulesListContract._size();
    assert.equal(size, 1);
    let exists = await rulesListContract._exists(address2);
    assert.ok(exists);

    await rulesListContract._remove(address2);

    size = await rulesListContract._size();
    assert.equal(size, 0);
    exists = await rulesListContract._exists(address2);
    assert.notOk(exists);
  });

  it("get by index on empty list should return undefined", async () => {
    let a = await rulesListContract.allowlist[0];

    assert.isUndefined(a);
  });
});
