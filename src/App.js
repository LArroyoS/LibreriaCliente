import React, {useEffect, useState } from "react";
import axios from "axios"

function App() {

  const [lista,setLista] = useState([]);
  const [auxiliar,setAuxiliar] = useState(null);
  const [respuesta,setRespuesta] = useState([]);

  useEffect(() => {

  },[]);

  const actualizar = async () => {
    const res = axios.get("http://localhost:8080/Libros")
    .then(res => {
      const data = res.data;
      setLista(data);
    });
  }

  const borrarLibro = async (id) => {
    const res = axios.delete("http://localhost:8080/Libro/"+id,{ crossdomain: true })
    .then(res => {
      const data = res.data;
      setRespuesta(data)
    });
  }

  return (
    <div>
      {/*
      <p> { JSON.stringify(lista) } </p>
      <p> { JSON.stringify(auxiliar) } </p>
      <p> { JSON.stringify(respuesta) } </p>
      */
      }
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container d-flex justify-content-end">
          <button onClick={() => actualizar()} className="btn btn-primary ms-1">
            <i className="bi bi-plus-circle-fill"></i> Actualizar
          </button>
          <button className="btn btn-primary ms-1" data-bs-toggle="modal" data-bs-target="#insertar">
            <i className="bi bi-plus-circle-fill"></i> Agregar Libro
          </button>
          <button className="btn btn-danger ms-1" data-bs-toggle="modal" data-bs-target="#eliminar">
            <i className="bi bi-dash-circle-fill"></i> Eliminar Libro
          </button>
        </div>
      </nav>
      <div className="container">
        <table className="table table-hover hover-primary">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Titulo</th>
              <th scope="col">Editorial</th>
              <th scope="col">Edicion</th>
              <th scope="col">Genero</th>
              <th scope="col">Autor</th>
              <th scope="col">Idioma</th>
              <th scope="col">Publicación</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">
                <span className="circulo"></span>
              </td>
              <td scope="col">Titulo</td>
              <td scope="col">Editorial</td>
              <td scope="col">Edicion</td>
              <td scope="col">Genero</td>
              <td scope="col">Autor</td>
              <td scope="col">Idioma</td>
              <td scope="col">Publicación</td>
              <td scope="col">
                <div className="d-flex justify-content-center">
                  <button className="btn btn-warning ms-1" data-bs-toggle="modal" data-bs-target="#modificar">
                    <i className="bi bi-pencil-fill"></i> .
                  </button>
                  <button className="btn btn-danger ms-1" data-bs-toggle="modal" data-bs-target="#eliminar">
                    <i className="bi bi-trash-fill"></i> .
                  </button>
                </div>
              </td>
            </tr>
            { 
              lista.map( (item) => {
                return (
                  <tr key={item.id}>
                    <td scope="row">
                      <span className="circulo"></span>
                    </td>
                    <td scope="col">{item.titulo}</td>
                    <td scope="col">{item.editorial}</td>
                    <td scope="col">{item.genero}</td>
                    <td scope="col">{item.autor}</td>
                    <td scope="col">{item.idioma}</td>
                    <td scope="col">{item.publicacion}</td>
                    <td scope="col">{item.edicion}</td>
                    <td scope="col">
                      <div className="d-flex justify-content-center">
                        <button className="btn btn-warning ms-1" data-bs-toggle="modal" data-bs-target="#modificar">
                          <i className="bi bi-pencil-fill"></i> .
                        </button>
                        <button data-bs-toggle="modal" data-bs-target="#eliminar" className="btn btn-danger ms-1" onClick={() => { 
                            setAuxiliar({id: item.id});
                          }}>
                          <i className="bi bi-trash-fill"></i> .
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

      {/* Modal 1*/}
      <div className="modal fade" id="insertar" aria-labelledby="insertar" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Agregar Libro(s)</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row row-cols-lg-auto g-3 align-items-center">
                
                <div className="col-12">
                  <label className="form-label">Titulo</label>
                  <div className="input-group">
                    <div className="input-group-text">@</div>
                    <input type="text" className="form-control" id="insertarTitulo" placeholder="Titulo"/>
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label">Editorial</label>
                  <div className="input-group">
                    <div className="input-group-text">@</div>
                    <input type="text" className="form-control" id="insertarEditorial" placeholder="Editorial"/>
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label">Genero</label>
                  <select className="form-select" id="insertarGenero">
                    <option defaultValue>Seleccione uno ...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label">Autor</label>
                  <div className="input-group">
                    <div className="input-group-text">@</div>
                    <input type="text" className="form-control" id="insertarAutor" placeholder="Autor"/>
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label">Idioma</label>
                  <select className="form-select" id="insertarIdioma">
                    <option defaultValue>Seleccione uno...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label">Publicación</label>
                  <div className="input-group">
                    <div className="input-group-text">@</div>
                    <input type="text" className="form-control" id="insertarPublicacion" placeholder="Titulo"/>
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label">Edición</label>
                  <div className="input-group">
                    <div className="input-group-text">@</div>
                    <input type="numbar" className="form-control" id="insertarEdicion" placeholder="Titulo"/>
                  </div>
                </div>

              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Guardar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal 2 */}
      <div className="modal fade" id="eliminar" aria-labelledby="eliminar" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Eliminar Libro(s)</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              ¿Esta seguro que quiere eliminar estos archivos?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-danger" onClick={() => {
                  borrarLibro(auxiliar.id)
                  setAuxiliar(null);
                }
                } 
                data-bs-dismiss="modal">Eliminar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal 3*/}
      <div className="modal fade" id="modificar" aria-labelledby="modificar" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Actualizar Libro</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row row-cols-lg-auto g-3 align-items-center">
                
                <div className="col-12">
                  <label className="form-label">Titulo</label>
                  <div className="input-group">
                    <div className="input-group-text">@</div>
                    <input type="text" className="form-control" id="insertarTitulo" placeholder="Titulo"/>
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label">Editorial</label>
                  <div className="input-group">
                    <div className="input-group-text">@</div>
                    <input type="text" className="form-control" id="insertarEditorial" placeholder="Editorial"/>
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label">Genero</label>
                  <select className="form-select" id="insertarGenero">
                    <option defaultValue>Seleccione uno ...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label">Autor</label>
                  <div className="input-group">
                    <div className="input-group-text">@</div>
                    <input type="text" className="form-control" id="insertarAutor" placeholder="Autor"/>
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label">Idioma</label>
                  <select className="form-select" id="insertarIdioma">
                    <option defaultValue>Seleccione uno...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label">Publicación</label>
                  <div className="input-group">
                    <div className="input-group-text">@</div>
                    <input type="text" className="form-control" id="insertarPublicacion" placeholder="Titulo"/>
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label">Edición</label>
                  <div className="input-group">
                    <div className="input-group-text">@</div>
                    <input type="numbar" className="form-control" id="insertarEdicion" placeholder="Titulo"/>
                  </div>
                </div>

              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Guardar</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
