import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import CategoryCard from "../components/card/CategoryCard";
import Loading from "../components/shares/Loading";
import categorySchema from "../schemas/categorySchema";
import request from "../server";
import useFetchPagination from "../hooks/useFetchPagination";
const HomePage = () => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const params = JSON.stringify({ name: search });
  const {
    data: categories,
    loading,
    refetch,
    pagination,
  } = useFetchPagination("category", params);

  const {
    formState: { errors, touchedFields },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(categorySchema),
  });

  const closeModal = () => {
    setShow(false);
  };

  const showModal = () => {
    setSelected(null);
    reset({ name: "", image: "" });
    setShow(true);
  };

  const onSubmit = async (data) => {
    try {
      if (selected === null) {
        await request.post("category", data);
      } else {
        await request.put(`category/${selected}`, data);
      }
      closeModal();
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const editCategory = async (id) => {
    try {
      setSelected(id);
      setShow(true);
      let { data } = await request.get(`category/${id}`);
      reset(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCategory = async (id) => {
    let confirmDelete = confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      await request.delete(`category/${id}`);
      refetch();
    }
  };

  return (
    <div className="container">
      <InputGroup className="my-3">
        <Form.Control
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Searching category"
        />
        <Button variant="outline-secondary" onClick={showModal}>
          Add category
        </Button>
      </InputGroup>
      <Row xs={1} sm={2} md={3} lg={4}>
        {loading ? (
          <Loading />
        ) : (
          categories.map((category) => (
            <Col className="mb-3" key={category.id}>
              <CategoryCard
                {...category}
                editCategory={editCategory}
                deleteCategory={deleteCategory}
              />
            </Col>
          ))
        )}
      </Row>
      {pagination}
      <Modal show={show} onHide={closeModal} backdrop="static" keyboard={false}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Category data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Category name</Form.Label>
              <Form.Control
                {...register("name")}
                type="text"
                placeholder="Category name"
              />
              {touchedFields.name && errors.name ? (
                <p className="text-danger">{errors.name.message}</p>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>Image url</Form.Label>
              <Form.Control
                {...register("image")}
                type="text"
                placeholder="Image name"
              />
            </Form.Group>
            {touchedFields.image && errors.image ? (
              <p className="text-danger">{errors.image.message}</p>
            ) : null}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              {selected === null ? "Add" : "Save"} category
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default HomePage;
