const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// @route   GET /api/v2/items
// @desc    Get all items (v2 - with enhanced response format)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    
    // v2 enhancement: Added metadata and statistics
    const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    res.status(200).json({
      success: true,
      version: 'v2',
      metadata: {
        count: items.length,
        totalValue: totalValue.toFixed(2),
        timestamp: new Date().toISOString()
      },
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @route   GET /api/v2/items/:id
// @desc    Get single item
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      version: 'v2',
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @route   POST /api/v2/items
// @desc    Create new item (v2 - with notification simulation)
// @access  Public
router.post('/', async (req, res) => {
  try {
    const item = await Item.create(req.body);
    
    // v2 enhancement: Simulate notification or webhook
    console.log(`[v2] New item created: ${item.name}`);
    
    res.status(201).json({
      success: true,
      version: 'v2',
      message: 'Item created and notification sent',
      data: item
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// @route   PUT /api/v2/items/:id
// @desc    Update item
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      version: 'v2',
      data: item
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// @route   DELETE /api/v2/items/:id
// @desc    Delete item (v2 - soft delete option)
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    // v2 enhancement: Support soft delete via query parameter
    const softDelete = req.query.soft === 'true';
    
    let item;
    if (softDelete) {
      // Soft delete - just mark as inactive
      item = await Item.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
      );
    } else {
      // Hard delete - remove from database
      item = await Item.findByIdAndDelete(req.params.id);
    }
    
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      version: 'v2',
      message: softDelete ? 'Item deactivated' : 'Item permanently deleted',
      data: softDelete ? item : {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;

