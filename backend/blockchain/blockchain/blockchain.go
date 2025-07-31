package blockchain

import (
	"fmt"
	"sync"
	"time"

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

	var last *models.Block
	for i := len(Blockchain) - 1; i >= 0; i-- {
		if Blockchain[i].LandTransfer.LandID == transfer.LandID {
			last = &Blockchain[i]
			break
		}
	}

	if last != nil && last.LandTransfer.ToOwnerID == transfer.ToOwnerID {
		panic("Transfer invalid: current owner is already the target owner")
	}

	var newBlock models.Block
	if last != nil {
		newBlock = GenerateBlock(*last, transfer)
	} else {
		genesis := models.Block{
			Index:     0,
			Timestamp: time.Now().UTC().Format(time.RFC3339),
			LandTransfer: models.LandTransfer{
				LandID:       transfer.LandID,
				FromOwnerID:  nil,
				ToOwnerID:    transfer.ToOwnerID,
				TransferDate: transfer.TransferDate,
				VerifiedBy:   transfer.VerifiedBy,
			},
			PrevHash: "",
		}
		genesis.Hash = CalculateHash(genesis)
		newBlock = genesis
	}

	Blockchain = append(Blockchain, newBlock)
	return newBlock
}


func LoadBlockchainFromDB(blocks []models.Block) {
	mutex.Lock()
	defer mutex.Unlock()

	Blockchain = blocks
}

func ValidateChain() error {
	mutex.Lock()
	defer mutex.Unlock()

	for i := 1; i < len(Blockchain); i++ {
		prev := Blockchain[i-1]
		curr := Blockchain[i]

		expectedHash := CalculateHash(curr)
		if curr.Hash != expectedHash {
			return fmt.Errorf("block %d has invalid hash", curr.Index)
		}
		if curr.PrevHash != prev.Hash {
			return fmt.Errorf("block %d has mismatched PrevHash", curr.Index)
		}
	}

	return nil
}


func GetLastBlock() models.Block {
	return Blockchain[len(Blockchain)-1]
}
