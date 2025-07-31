package blockchain

import (
	"crypto/sha256"
	"encoding/json"
	"fmt"
	"time"

	"landchain/models"
)

func CalculateHash(block models.Block) string {
	blockData, _ := json.Marshal(block.LandTransfer)
	record := fmt.Sprintf("%d%s%s", block.Index, string(blockData), block.PrevHash)
	h := sha256.New()
	h.Write([]byte(record))
	return fmt.Sprintf("%x", h.Sum(nil))
}

func GenerateBlock(prev models.Block, transfer models.LandTransfer) models.Block {
	newBlock := models.Block{
		Index:        prev.Index + 1,
		Timestamp:    time.Now().UTC().Format(time.RFC3339),
		LandTransfer: transfer,
		PrevHash:     prev.Hash,
	}
	newBlock.Hash = CalculateHash(newBlock)
	return newBlock
}
