import React, { useEffect, useState } from "react";

//bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { 
  BsPlusCircle,
  BsTrashFill,
  BsArrowClockwise,
  BsFillXCircleFill,
  BsFillPencilFill,
  BsCircle,
  BsCircleFill,
  BsXCircleFill,
  BsDashCircle
} from "react-icons/bs";
import {
  Navbar,
  NavbarBrand,
  NavItem,
  Table ,
  Button,
  Col, 
  Row, 
  Form, 
  FormGroup, 
  Label, 
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Collapse
} from 'reactstrap';
//axios(Peticiones)
import axios from "axios";

class Libro{
  constructor(
      id = 0, 
      titulo = "",
      editorial = "", 
      genero = 0, 
      autor = "", 
      idioma = 0, 
      publicacion = null, 
      edicion = 0){
    this.id = id;
    this.titulo = titulo;
    this.editorial = editorial; 
    this.genero = genero; 
    this.autor = autor;
    this.idioma = idioma;
    this.publicacion = publicacion; 
    this.edicion = edicion;
  }
}

function App() {

  const [modal, setModal] = useState(0);
  const toggle = (id) => setModal((id==modal)? 0:id);

  const [listLibros, setListLibros] = useState(0);
  const toggleLibros = (index) => {
    setListLibros((index==listLibros)? 0:index);
  }

  const [libros, setLibros] = useState([]);
  const [libro, setLibro] = useState(new Libro());

  const [seleccionar, setSeleccionar] = useState([]);
  
  const [buscar,setBuscar] = useState("");
  const [lista,setLista] = useState([]);

  const [respuesta,setRespuesta] = useState([]);

  useEffect(() => {

  },[]);

  const actualizar = async () => {
    const res = await axios.get("http://localhost:8080/Libros")
    .then(res => {
      const data = res.data;
      setLista(data);
    });
  }

  const onChange = (i,target) => {
    const { name, value } = target;
    setLibros(libros.map((item,index) => {
      if(i==index){
        return {
          ...item,
          [name]: value
        }
      }
      return item;
    }));
  }

  const onChangeEdit = (target) => {
    const { name, value } = target;
    setLibro({
      ...libro,
      [name]: value
    })
  }

  const borrarLibro = async (id) => {
    const res = await axios.delete("http://localhost:8080/Libro/"+id,{ crossdomain: true })
    .then(res => {
      const data = res.data;
      setRespuesta(data)
    });
  }

  const borrarLibros = async (seleccionar) => {
    const res = await axios.post("http://localhost:8080/Libros/Eliminar",seleccionar,{ crossdomain: true })
    .then(res => {
      const data = res.data;
      setRespuesta(data)
    });
  }

  const consultarLibro = async (id) => {
    const res = await axios.get("http://localhost:8080/Libro/"+id,{ crossdomain: true })
    .then(res => {
      const data = res.data;
      setLibro(data)
    });
  }

  const crearLibros = async (libros) => {
    const res = await axios.post("http://localhost:8080/Libros",libros,{ crossdomain: true })
    .then(res => {
      const data = res.data;
      setRespuesta(data)
    });
  }

  const modificarLibro = async (libro) => {
    alert(libro.id)
    const res = await axios.patch("http://localhost:8080/Libro/"+libro.id,libro,{ crossdomain: true })
    .then(res => {
      const data = res.data;
      setRespuesta(data)
    });
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand><h2>Libros</h2></NavbarBrand>
        <Navbar>
          <NavItem>
            <Input type="text" name="buscar" id="buscar" value={buscar} onChange={({target}) => setBuscar(target.value) } placeholder="Buscar" />
          </NavItem>
          <NavItem>
            <Button color="info" onClick={actualizar}><BsArrowClockwise/></Button>
          </NavItem>
          <NavItem>
            <Button color="success" onClick={() => toggle(1)}><BsPlusCircle/></Button>
          </NavItem>
          <NavItem>
            <Button color="danger" onClick={() => toggle(4)}><BsTrashFill/></Button>
          </NavItem>
        </Navbar>
      </Navbar>
      <Table hover>
        <thead>
          <tr>
            <th onClick={() => {
              if(seleccionar.length==lista.length){
                setSeleccionar([]);
              }
              else{
                setSeleccionar(
                  lista.map((item) => { return item.id })
                )
              }
            }}>
              { (seleccionar.length==lista.length)? <BsCircleFill/>:<BsCircle/> }</th>
            <th>Titulo</th>
            <th>Editorial</th>
            <th>Edicion</th>
            <th>Genero</th>
            <th>Autor</th>
            <th>Idioma</th>
            <th>Publicación</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
        { 
          lista.map( (item) => {
            if(buscar==""){
              return (
                <tr key={item.id}>
                  <td onClick={() => {
                    if(seleccionar.includes(item.id)){
                      setSeleccionar(
                        seleccionar.filter((dato) => dato!=item.id)
                      );
                    }
                    else{
                      setSeleccionar([
                        ...seleccionar,
                        item.id
                      ])
                    }
                  }}>
                    { (seleccionar.includes(item.id))? <BsCircleFill/>:<BsCircle/> }
                  </td>
                  <td>{item.titulo}</td>
                  <td>{item.editorial}</td>
                  <td>{item.edicion}</td>
                  <td>{item.genero}</td>
                  <td>{item.autor}</td>
                  <td>{item.idioma}</td>
                  <td>{item.publicacion}</td>
                  <td>
                    <Button outline color="secondary" onClick={() => {
                      consultarLibro(item.id);
                      toggle(2);
                    }}><BsFillPencilFill/></Button>
                    <Button outline color="danger" onClick={() => {
                      consultarLibro(item.id);
                      toggle(3);
                    }}><BsFillXCircleFill/></Button>
                  </td>
                </tr>
              )
            }
            else{
              if(
                (""+item.titulo).includes(buscar) || 
                (""+item.editorial).includes(buscar) || 
                (""+item.edicion).includes(buscar) || 
                (""+item.genero).includes(buscar) || 
                (""+item.autor).includes(buscar) || 
                (""+item.idioma).includes(buscar) || 
                (""+item.publicacion).includes(buscar)){
                return (
                  <tr key={item.id}>
                    <td onClick={() => {
                      if(seleccionar.includes(item.id)){
                        setSeleccionar(
                          seleccionar.filter((dato) => dato!=item.id)
                        );
                      }
                      else{
                        setSeleccionar([
                          ...seleccionar,
                          item.id
                        ])
                      }
                    }}>
                      { (seleccionar.includes(item.id))? <BsCircleFill/>:<BsCircle/> }
                    </td>
                    <td>{item.titulo}</td>
                    <td>{item.editorial}</td>
                    <td>{item.edicion}</td>
                    <td>{item.genero}</td>
                    <td>{item.autor}</td>
                    <td>{item.idioma}</td>
                    <td>{item.publicacion}</td>
                    <td>
                      <Button outline color="secondary" onClick={() => {
                        consultarLibro(item.id);
                        toggle(2);
                      }}><BsFillPencilFill/></Button>
                      <Button outline color="danger" onClick={() => {
                        consultarLibro(item.id);
                        toggle(3);
                      }}><BsFillXCircleFill/></Button>
                    </td>
                  </tr>
                )
              }
            }
          })
        }
        </tbody>
      </Table>

      {/* Modal 1*/}
      <Modal isOpen={modal==1} toggle={()=>toggle(1)}>
        <ModalHeader toggle={() => toggle(1)} close={<BsXCircleFill onClick={() => toggle(1)} size={30}/>}>Insertar Libro(s)</ModalHeader>
        <ModalBody>
          <Button color="success" onClick={() => setLibros([...libros,new Libro()])}><BsPlusCircle/></Button>
          <Button color="danger" onClick={() => 
            setLibros(libros.filter((item,index) => index!=libros.length-1)
          )}><BsDashCircle/></Button>
          <h5>{ libros.length }</h5>
          {
            libros.map((item, index) => {
              return (
                <ListGroup>
                  <ListGroupItem>
                    <ListGroupItemHeading onClick={() => toggleLibros(index+1)}>Libro #{index+1}</ListGroupItemHeading>
                    <Collapse isOpen={listLibros==index+1}>
                      <Formulario onChange={({target}) => onChange(index,target)} index={index} libro={item}/>
                    </Collapse>
                  </ListGroupItem>
                </ListGroup>
              );
            })
          }
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => toggle(1)}>Cancelar</Button>
          <Button color="success" onClick={() => {
            toggle(1); 
            crearLibros(libros)
          }}>Guardar</Button>
        </ModalFooter>
      </Modal>

      {/* Modal 2*/}
      <Modal isOpen={modal==2} toggle={() => toggle(2)}>
        <ModalHeader toggle={() => toggle(2)} close={<BsXCircleFill onClick={() => toggle(2)} size={30}/>}>Modificar Libro</ModalHeader>
        <ModalBody>
          <Formulario onChange={({target}) => onChangeEdit(target)} libro={libro}/>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => toggle(2)}>Cancelar</Button>
          <Button color="success" onClick={() => {
            toggle(2); 
            modificarLibro(libro);
          }}>Guardar</Button>
        </ModalFooter>
      </Modal>

      {/* Modal 3*/}
      <Modal isOpen={modal==3} toggle={() => toggle(3)}>
        <ModalHeader toggle={() => toggle(3)} close={<BsXCircleFill onClick={() => toggle(3)} size={30}/>}>Eliminar</ModalHeader>
        <ModalBody>
          <h4>¿Esta seguro que quiere eliminar este registro?</h4>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => toggle(3)}>Cancelar</Button>
          <Button color="danger" onClick={() => {
            toggle(3); 
            borrarLibro(libro.id);
          }}>Eliminar</Button>
        </ModalFooter>
      </Modal>

      {/* Modal 4*/}
      <Modal isOpen={modal==4} toggle={() => toggle(4)}>
        <ModalHeader toggle={() => toggle(4)} close={<BsXCircleFill onClick={() => toggle(4)} size={30}/>}>Eliminar</ModalHeader>
        <ModalBody>
          <h4>¿Esta seguro que desea eliminarlo(s)?</h4>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => toggle(4)}>Cancelar</Button>
          <Button color="danger" onClick={() => {
            toggle(4); 
            borrarLibros(seleccionar);
          }}>Eliminar</Button>
        </ModalFooter>
      </Modal>
      
    </div>
  );

}

const Formulario = ({onChange, index, libro = new Libro()}) => {
  return (
    <Form>
      <FormGroup>
        <Label for="titulo">Titulo</Label>
        <Input type="text" onChange={onChange} value={libro.titulo} name="titulo" id="titulo" placeholder="Titulo" />
      </FormGroup>
      <FormGroup>
        <Label for="autor">autor</Label>
        <Input type="text" onChange={onChange} value={libro.autor} name="autor" id="Autor" placeholder="Autor"/>
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="editorial">Editorial</Label>
            <Input type="text" onChange={onChange} value={libro.editorial} name="editorial" id="editorial" placeholder="Editorial" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="edicion">Edicion</Label>
            <Input type="number" onChange={onChange} value={libro.edicion} name="edicion" id="edicion" placeholder="Edicion"/>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="genero">Genero</Label>
            <Input type="number" onChange={onChange} value={libro.genero} name="genero" id="genero" placeholder="Genero"/>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="idioma">Idioma</Label>
            <Input type="number" onChange={onChange} value={libro.idioma} name="idioma" id="idioma" placeholder="Idioma"/>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="publicacion">Publicación</Label>
            <Input type="text" onChange={onChange} value={libro.publicacion} name="publicacion" id="publicacion" placeholder="Publicacion"/>
          </FormGroup>  
        </Col>
      </Row>
    </Form>
  );
}

export default App;
