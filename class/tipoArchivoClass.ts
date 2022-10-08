import { Response } from "express";
import { CallbackError } from "mongoose";
import Server from "./server";

// Interfaces
import { TipoArchivoInteface } from "../interfaces/tipoArchivo";

// Modelos
import tipoArchivoModel from "../models/tipoArchivoModel";

export class TipoArchivo {
  constructor() {}

  crearTipoArchivo(req: any, resp: Response): void {
    const idCreador = req.usuario._id;
    const nombre = req.body.nombre;
    const estado: boolean = req.body.estado;

    const nuevoTipoArchivo = new tipoArchivoModel({
      idCreador,
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
    const id = req.get("id");
    const nombre = req.body.nombre;
    const estado: boolean = req.body.estado;

    const respTipoArchivo = await tipoArchivoModel.findById(id).exec();

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

      tipoArchivoModel.findByIdAndUpdate(
        id,
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
    const id = req.get("id");

    tipoArchivoModel.findById(
      id,
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
    tipoArchivoModel.find(
      {},
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
    const id = req.get("id");

    tipoArchivoModel.findById(
      id,
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

        tipoArchivoModel.findByIdAndDelete(
          id,
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
