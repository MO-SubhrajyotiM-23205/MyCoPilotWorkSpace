const User = {
    name: "John",
    age: 30,
    location: "USA",
    email: "john@example.com"
};


User.name = "SUBHRAJYOTI";

const { name, age, location, email } = User;

const options1 = [1,2,3,4];
const options2 = [7,8,9,10];

const options = [...options1, ...options2];


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
                {options.map((opt, idx) => (
                    <option key={idx} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    );
};

export default UserInfo;