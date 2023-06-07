import { IAddLocationReq, IGetLocationReq, ILocation, IUpdateLocationReq } from "@/models/Location.model";
import { Request, Response, RequestHandler } from "express";
import * as locationServices from "@/services/location.services";

export const index: RequestHandler = async (request: Request, response: Response) => {
    try {
        const results = await locationServices.fetchAll();
        response.status(200).json({ locations: results });
    } catch (error) {
        console.error("[location.controller.ts][index][error]: ", error);
        response.status(500).json({message: 'Error fetching location'});
    }
};

export const store: RequestHandler = async (request: IAddLocationReq, response: Response) => {
    try {
        const location: ILocation = request.body;

        const results = await locationServices.store(location);
        response.status(200).json({status: results?.affectedRows});
    } catch (error) {
        console.error("[location.controller.ts][store][error]: ", error);
        response.status(500).json({message: 'Error storing location'});
    }
};

//@ts-expect-error
export const updateById: RequestHandler = async (request: IUpdateLocationReq, response: Response) => {
    try {
        const location: ILocation = {
            ...request.params,
            ...request.body
        };

        const results = await locationServices.updateById(location);
        response.status(200).json({ status: results?.affectedRows });
    } catch (error) {
        console.error("[location.controller.ts][update][error]: ", error);
        response.status(500).json({message: 'Error updating location'});
    }
};

//@ts-expect-error
export const destroyById: RequestHandler = async (request: IGetLocationReq, response: Response) => {
    try {
        
    } catch (error) {
        console.error("[location.controller.ts][destroy][error]: ", error);
        response.status(500).json({message: 'Error destroying location'});
    }
};