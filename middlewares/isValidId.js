import {isValidObjectId} from "mongoose";
import HttpError from "../helpers/HttpError.js";


export const isValidId = (req, res, next) => {
    try {
        const {id} = req.params
        if(!isValidObjectId(id)){
            throw HttpError(404, 'Not found')
        }
        next()
    } catch (error) {
        next(error)
    }
}