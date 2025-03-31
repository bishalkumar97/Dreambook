const authorPermissions = {
    "admin": {
        "dashboard": true,
        "books": true,
        "authors": true,
        "employees": true,
        "settings": false,
        "payNow": true,
        "editBook": true
    },
    "author":{
        "dashboard": true,
        "books": true,
        "authors": false,
        "employees": false,
        "settings": true,
        "payNow": false,
        "editBook": false
    },
    "employee":{
        "dashboard": true,
        "books": true,
        "authors": false,
        "employees": false,
        "settings": false,
        "payNow": false,
        "editBook": true
    }
}
export const permissionHandler = (option, role) => {
    if(authorPermissions[role]?.[option]){
      return true;
    }
    else return false;
}
