import { Response } from "express";
import { CallbackError } from "mongoose";
const mongoose = require("mongoose");

import Server from "./server";

// Interfaces
import { TipoArchivoInteface } from "../interfaces/tipoArchivo";

// Modelos
import tipoArchivoModel from "../models/tipoArchivoModel";

export class TipoArchivo {
  constructor() {}

  crearTipoArchivo(req: any, resp: Response): void {
    const idCreador = new mongoose.Types.ObjectId(req.usuario._id);
    const foranea = new mongoose.Types.ObjectId(req.body.foranea);
    const nombre = req.body.nombre;
    const estado: boolean = req.body.estado;

    const nuevoTipoArchivo = new tipoArchivoModel({
      idCreador,
      foranea,
      nombre,
      estado,
    });

    nuevoTipoArchivo.save(
      (err: CallbackError, TipoArchivoDB: TipoArchivoInteface) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: `Error interno`,
            err,
          });
        } else {
          return resp.json({
            ok: true,
            mensaje: `Tipo de archivo creado`,
            TipoArchivoDB,
          });
        }
      }
    );
  }

  async editarTipoArchivo(req: any, resp: Response): Promise<any> {
    const _id = new mongoose.Types.ObjectId(req.body.id);
    const foranea = new mongoose.Types.ObjectId(req.body.foranea);
    const nombre = req.body.nombre;
    const estado: boolean = req.body.estado;

    const respTipoArchivo = await tipoArchivoModel
      .findOne({ _id, foranea })
      .exec();

    if (!respTipoArchivo) {
      return resp.json({
        ok: false,
        mensaje: `No se encontró un Tipo de archivo`,
      });
    } else {
      const query = {
        nombre: nombre,
        estado: estado,
      };

      if (!query.nombre) {
        query.nombre = respTipoArchivo.nombre;
      }

      tipoArchivoModel.findOneAndUpdate(
        { _id, foranea },
        query,
        { new: true },
        (err: CallbackError, tipoArchivoDB: any) => {
          if (err) {
            return resp.json({
              ok: false,
              mensaje: `Error interno`,
              err,
            });
          } else {
            return resp.json({
              ok: true,
              mensaje: "Tipo archivo actualizado",
              tipoArchivoDB,
            });
          }
        }
      );
    }
  }

  obtenerTipoArchivo(req: any, resp: Response): void {
    const _id = new mongoose.Types.ObjectId(req.get("id"));
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));

    tipoArchivoModel.findOne(
      { _id, foranea },
      (err: CallbackError, tipoArchivoDB: TipoArchivoInteface) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: `Error interno`,
            err,
          });
        }

        if (!tipoArchivoDB) {
          return resp.json({
            ok: false,
            mensaje: `No se encontró un tipo archivo`,
          });
        }

        return resp.json({
          ok: true,
          tipoArchivoDB,
        });
      }
    );
  }

  obtenerTiposArchivos(req: any, resp: Response): void {
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));

    tipoArchivoModel.find(
      { foranea },
      (err: CallbackError, tiposArchivosDB: Array<TipoArchivoInteface>) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: `Error interno`,
            err,
          });
        }

        return resp.json({
          ok: true,
          tiposArchivosDB,
        });
      }
    );
  }

  eliminarTipoArchivo(req: any, resp: Response): void {
    const _id = new mongoose.Types.ObjectId(req.get("id"));
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));

    tipoArchivoModel.findOne(
      { _id, foranea },
      (err: CallbackError, tipoArchivoDB: TipoArchivoInteface) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: `Error interno`,
            err,
          });
        }

        if (!tipoArchivoDB) {
          return resp.json({
            ok: false,
            mensaje: `No se encontró un tipo archivo`,
          });
        }

        tipoArchivoModel.findOneAndDelete(
          { _id, foranea },
          {},
          (err: CallbackError, tipoArchivoDB: any) => {
            if (err) {
              return resp.json({
                ok: false,
                mensaje: `Error interno`,
                err,
              });
            } else {
              return resp.json({
                ok: true,
                tipoArchivoDB,
              });
            }
          }
        );
      }
    );
  }
}
