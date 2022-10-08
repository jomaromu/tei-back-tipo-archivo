import { Response, Request, Router } from "express";
import { verificaToken } from "../auth/auth";
import { TipoArchivo } from "../class/tipoArchivoClass";

const tipoArchivoRoute = Router();

tipoArchivoRoute.post(
  "/crearTipoArchivo",
  [verificaToken],
  (req: Request, resp: Response) => {
    const crearTipoArchivo = new TipoArchivo();
    crearTipoArchivo.crearTipoArchivo(req, resp);
  }
);

tipoArchivoRoute.put(
  "/editarTipoArchivo",
  [verificaToken],
  (req: Request, resp: Response) => {
    const editarTipoArchivo = new TipoArchivo();
    editarTipoArchivo.editarTipoArchivo(req, resp);
  }
);

tipoArchivoRoute.get(
  "/obtenerTipoArchivo",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerTipoArchivo = new TipoArchivo();
    obtenerTipoArchivo.obtenerTipoArchivo(req, resp);
  }
);

tipoArchivoRoute.get(
  "/obtenerTiposArchivos",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerTiposArchivos = new TipoArchivo();
    obtenerTiposArchivos.obtenerTiposArchivos(req, resp);
  }
);

tipoArchivoRoute.delete(
  "/eliminarTipoArchivo",
  [verificaToken],
  (req: Request, resp: Response) => {
    const eliminarTipoArchivo = new TipoArchivo();
    eliminarTipoArchivo.eliminarTipoArchivo(req, resp);
  }
);

export = tipoArchivoRoute;
