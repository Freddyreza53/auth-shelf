const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM "item";`;
  pool.query(queryText)
  .then(result => {
    res.send(result.rows)
    
  }).catch(err => { 
  res.sendStatus(500);
   // For testing only, can be removed
  });
}); 
/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated , (req, res) => {
  // endpoint functionality
  let item = req.body;

  let queryText = `
    INSERT INTO "item" ("description", "image_url", "user_id")
    VALUES ($1, $2, $3);
  `;

  let values = [item.newItemDescription, item.newItemUrl, req.user.id]

  pool.query(queryText, values)
    .then(result => {
      res.sendStatus(201)
      
    }).catch(err => { 
    res.sendStatus(500);
    // For testing only, can be removed
    });
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  let queryText = `
    DELETE FROM "item"
    WHERE "id" = $1 AND "user_id" = $2;
  `;

  let values = [req.params.id, req.user.id];

  pool.query(queryText, values)
    .then(result => {
      res.sendStatus(200)
      
    }).catch(err => { 
    res.sendStatus(500);
    // For testing only, can be removed
    });
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/', (req, res) => {
  // endpoint functionality
console.log(req.body.id, req.body.newItem);

  let queryText = `
    UPDATE "item"
    SET "description" = $2
    WHERE "id" = $1 AND "user_id" = $3;
  `;

  let values = [Number(req.body.id), req.body.newItem, req.user.id];

  pool.query(queryText, values)
    .then(result => {
      res.sendStatus(200)
      
    }).catch(err => { 
    res.sendStatus(500);
    // For testing only, can be removed
    });
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
