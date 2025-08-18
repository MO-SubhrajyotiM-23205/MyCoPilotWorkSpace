

const User = {
    name: "John",
    age: 30,
    location: "USA",
    email: "john@example.com"
};


User.name = "SUBHRAJYOTI";

const { name, age, location, email } = User;

const options1 = [10000,20000,30000,40000];
const options2 = [70000,80000,90000,100000];

const totalOptions = [...options1, ...options2];

const onTextChange = (e) => {
    alert(e.target.value);
};

const UserInfo = () => {
    return (
        <div>
            <h1>Lession 1</h1>
            <h2>User Information</h2>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Location: {location}</p>
            <p>Email: {email}</p>
            <label htmlFor="combo">Select an option: </label>
            <select id="combo">
                {totalOptions.map((opt, idx) => (
                    <option key={idx} value={opt}>{opt}</option>
                ))}
            </select>
            <input type="text" placeholder="Type here..." onChange={onTextChange} />
        </div>
    );
};

export default UserInfo;