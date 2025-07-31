package db

import (
	"database/sql"
	"landchain/models"
	"time"
)

func LoadAllBlocks() ([]models.Block, error) {
	query := `
		SELECT 
			blockIndex, transferDate, verifiedBy, blockHash, prevBlockHash,
			fromLandOwnersId, toLandOwnersId, landsId
		FROM land_transfer_chain
		ORDER BY landsId, blockIndex ASC
	`

	rows, err := DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var blocks []models.Block
	for rows.Next() {
		var b models.Block
		var fromOwner sql.NullInt64
		var transferDate time.Time

		err := rows.Scan(
			&b.Index,
			&transferDate,
			&b.LandTransfer.VerifiedBy,
			&b.Hash,
			&b.PrevHash,
			&fromOwner,
			&b.LandTransfer.ToOwnerID,
			&b.LandTransfer.LandID,
		)
		if err != nil {
			return nil, err
		}

		b.Timestamp = transferDate.UTC().Format(time.RFC3339)
		if fromOwner.Valid {
			fromID := int(fromOwner.Int64)
			b.LandTransfer.FromOwnerID = &fromID
		} else {
			b.LandTransfer.FromOwnerID = nil
		}
		b.LandTransfer.TransferDate = b.Timestamp

		blocks = append(blocks, b)
	}

	return blocks, nil
}
