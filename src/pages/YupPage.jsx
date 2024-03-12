import personSchema from "../schemas/personSchema";

const YupPage = () => {
  const submit = async (e) => {
    try {
      e.preventDefault();
      let person = {
        name: e.target.name.value,
        age: e.target.age.value,
        email: e.target.email.value,
        website: e.target.website.value,
        date: e.target.date.value,
      };
      let isValid = await personSchema.isValid(person);
      console.log(isValid);
      let validPerson = await personSchema.validate(person);
      console.log(validPerson);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <form className="container mt-4" onSubmit={submit}>
      <div className="form-group mb-3">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" className="form-control" />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="age">Age</label>
        <input type="number" id="age" name="age" className="form-control" />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" className="form-control" />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" className="form-control" />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="date">Created at</label>
        <input type="date" id="date" name="date" className="form-control" />
      </div>

      <div className="form-group mb-3">
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </div>
    </form>
  );
};

export default YupPage;
