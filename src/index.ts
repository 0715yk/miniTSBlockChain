import crypto from "crypto";

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }

  static calculateHash(prevHash: string, height: number, data: string) {
    const tohash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(tohash).digest("hex");
  }
}

class BlockChain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    else return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  }

  public getBlocks() {
    return [...this.blocks];
  }
}

const newBlockChain = new BlockChain();

newBlockChain.addBlock("first one");
newBlockChain.addBlock("second one");
newBlockChain.addBlock("third one");
newBlockChain.addBlock("fourth one");

newBlockChain.getBlocks().push(new Block("xxxxxxx", 11111, "HACKEDDDXXXX"));

console.log(newBlockChain.getBlocks());
