const user = {
    name: "Alice",
    surname: "Young",
    dates: {
      birthDate: new Date(1995, 10, 28)
    },
    contact: {
      phone: '111-111-111',
      address: {
        city: "London",
      }
    }
  };

function cloneDeep(obj) {
    let newObj = {};
    Object.entries(obj).forEach(entry => {
        const [key, value] = entry; 
        if (value instanceof Object && !(value instanceof Date))
            newObj[key] = cloneDeep(value);
        else newObj[key] = value;
    })
    return newObj
}

const userCp = cloneDeep(user);

user.name = "John";
user.surname = "White";
user.dates.birthDate = new Date(1999, 11, 11);
user.contact.phone = '222-222-222';
user.contact.address.city = 'New York'

console.log(user);
console.log(userCp);
