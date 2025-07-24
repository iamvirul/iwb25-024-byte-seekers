package blockchain

import (
	"sync"

	"landchain/models"
)

var Blockchain []models.Block
var mutex = &sync.Mutex{}

func InitGenesisBlock() {
	genesis := models.Block{
		Index:     0,
		Timestamp: "2024-01-01T00:00:00Z",
		Hash:      "0",
		PrevHash:  "0",
	}
	Blockchain = append(Blockchain, genesis)
}

func AddBlock(transfer models.LandTransfer) models.Block {
	mutex.Lock()
	defer mutex.Unlock()

	newBlock := GenerateBlock(Blockchain[len(Blockchain)-1], transfer)
	Blockchain = append(Blockchain, newBlock)
	return newBlock
}

func GetLastBlock() models.Block {
	return Blockchain[len(Blockchain)-1]
}
