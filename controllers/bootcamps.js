const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc    Get all bootcamps
//@route   GET /api/v1/bootcamps
//@access  Public
exports.getAllBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({ success: true, results: bootcamps.length, data: bootcamps });
});

//@desc    Get bootcamp
//@route   GET /api/v1/bootcamps/:id
//@access  Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp with id of ${req.params.id} not foundd`, 404));
    }
    res.status(200).json({ success: true, data: bootcamp });
})

//@desc    Create bootcamp
//@route   POST /api/v1/bootcamps
//@access  Public
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
        success: true,
        data: bootcamp
    })
})

//@desc    Update bootcamp
//@route   PUT /api/v1/bootcamps/:id
//@access  Public
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp with id of ${req.params.id} not foundd`, 404));
    }
    res.status(200).json({ success: true, data: bootcamp });
})

//@desc    Delete bootcamp
//@route   DELETE /api/v1/bootcamps/:id
//@access  Public
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp with id of ${req.params.id} not foundd`, 404));
    }
    res.status(200).json({ success: true, message: `Bootcamp ID: ${req.params.id} has been deleted.` });
})