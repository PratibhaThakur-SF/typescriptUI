import { UserModel } from "./User.js";
import { ICrud } from "./UserCrud.js";
import { Roles } from "./Role.js";

export class UserDetail implements ICrud<UserModel> {
  static users: UserModel[] = [
    new UserModel(
      1,
      "Pratibha",
      "1",
      "Thakur",
      "abc@gmail.com",
      58700,
      Roles.SUBSCRIBER,
      "XYZ"
    ),
    new UserModel(
      2,
      "Pratibha",
      "2",
      "Thakur",
      "abc@gmail.com",
      58700,
      Roles.ADMIN,
      "XYZ"
    ),
  ];

  add(user: UserModel) {
    const itemIndex = UserDetail.users.length;
    console.log(itemIndex);
    user.id = this.getnextId();
    console.log(user);
    UserDetail.users[itemIndex] = user;
    console.log(UserDetail.users);
    this.getNew(user);
  }

  getall(): UserModel[] {
    console.log("users:getall");
    console.log(UserDetail.users);
    return UserDetail.users;
  }

  getnextId(): number {
    let highest = 0;
    UserDetail.users.forEach(function (user) {
      if (highest === 0) {
        //first
        highest = user.id;
      }
      if (highest < user.id) {
        highest = user.id;
      }
    });
    console.log(highest + 1);
    return highest + 1;
  }

  delete(user: UserModel) {
    console.log(UserDetail.users.indexOf(user));
    UserDetail.users.splice(UserDetail.users.indexOf(user), 1); //remove user
    console.log(UserDetail.users);
  }

  update(user: UserModel) {
    let itemIndex: any;
    UserDetail.users.forEach((element) => {
      if (element.id == user.id) {
        itemIndex = UserDetail.users.findIndex(
          (item) => item.id === element.id
        );
      }
    });
    console.log(itemIndex);
    UserDetail.users[itemIndex] = user;
    console.log(UserDetail.users);
  }

  getNew(user: UserModel) {
    const table = document.querySelector("#user-table") as HTMLTableElement;
    let row = `<tr id="${user.id}">
        <td id="firstname">${user.firstName}</td>
        <td id="middlename">${user.middleName}</td>
        <td id="lastname">${user.lastName}</td>
        <td id="email">${user.email}</td>
        <td id="phonenumber">${user.phoneNumber}</td>
        <td>
          <select id="role" disabled>
            <option value="Super Admin" ${
              user.role === "Super Admin" ? "selected" : ""
            }>Super Admin</option>
            <option value="Admin" ${
              user.role === "Admin" ? "selected" : ""
            }>Admin</option>
            <option value="Subscriber" ${
              user.role === "Subscriber" ? "selected" : ""
            }>Subscriber</option>
          </select>
        </td>
        <td id="address">${user.address}</td>
        <td><button id="" class="EditSave btn btn-info">Edit</button>
            <button class="Cancel btn btn-danger" style="display:none;">cancel</button>
            <button id="delete-user" class="delete btn btn-danger">Delete</button>
        </td>
      </tr>`;
    table.innerHTML += row;
  }

  static refresh() {
    const table = document.querySelector("#user-table") as HTMLTableElement;
    this.users.forEach((user, index) => {
      let row = `<tr id="${user.id}" class="${index}">
        <td id="firstname">${user.firstName}</td>
        <td id="middlename">${user.middleName}</td>
        <td id="lastname">${user.lastName}</td>
        <td id="email">${user.email}</td>
        <td id="phonenumber">${user.phoneNumber}</td>
        <td id="role">
          <select disabled id="userrole">
            <option value="Super Admin" ${
              user.role === "Super Admin" ? "selected" : ""
            }>Super Admin</option>
            <option value="Admin" ${
              user.role === "Admin" ? "selected" : ""
            }>Admin</option>
            <option value="Subscriber" ${
              user.role === "Subscriber" ? "selected" : ""
            }>Subscriber</option>
          </select>
        </td>
        <td id="address">${user.address}</td>
        <td><button class="EditSave btn btn-info">Edit</button>
            <button class="Cancel btn btn-danger" style="display:none;">cancel</button>
            <button id="delete-user" class="delete btn btn-danger">Delete</button>
        </td>
      </tr>`;
      table.innerHTML += row;
    });
  }
}

const add = document.querySelector("#add") as HTMLButtonElement;
add.addEventListener("click", (e) => {
  let userform = document.querySelector("#add-user-form") as HTMLDivElement;
  userform.style.display = "block";
});

const submit = document.querySelector("#submit") as HTMLButtonElement;
submit.addEventListener("click", (e) => {
  let firstName = (document.querySelector("#firstName") as HTMLInputElement)
    .value;
  let middleName = (document.querySelector("#middleName") as HTMLInputElement)
    .value;
  let lastName = (document.querySelector("#lastName") as HTMLInputElement)
    .value;
  let email = (document.querySelector("#email") as HTMLInputElement).value;
  let phoneNumber = Number(
    (document.querySelector("#phoneNumber") as HTMLInputElement).value
  );
  //let role = (document.querySelector("#role") as HTMLSelectElement).innerHTML;
  let userrole = document.getElementById("userrole") as HTMLSelectElement;
  let sel = userrole.selectedIndex;
  let opt = userrole.options[sel];
  let role: any = (<HTMLSelectElement>(<unknown>opt)).value;
  let address = (document.querySelector("#address") as HTMLInputElement).value;
  let id = 0;
  UserDetail.prototype.add(
    new UserModel(
      id,
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      role,
      address
    )
  );
  let userform = document.querySelector("#add-user-form") as HTMLDivElement;
  userform.style.display = "none";
});
//DELETE Button
$("#user-table").on("click", ".delete", function () {
  const id: any = $(this).parents("tr").attr("id");
  console.log(id);
  const obj = UserDetail.users.filter((user) => user.id == id)[0];
  console.log(obj);
  UserDetail.prototype.delete(obj);
  $(this).parents("tr").remove();
});
//EDIT SAVE Button
$("#user-table").on("click", ".EditSave", function () {
  const id: any = $(this).parents("tr").attr("id");
  console.log(id);
  let currentTD = $(this)
    .parents("tr")
    .find("td")
    .filter(() => {
      return $(this).find(".EditSave").length === 0;
    }); //Get all the tds within tr

  if ($(this).html() == "Edit") {
    $.each(currentTD, () => {
      currentTD.prop("contenteditable", "true"); //make every td editable
      $(this).parents("tr").find(".Cancel").show();
      $(this).parents("tr").find(".delete").hide();
      $(this).parents("tr").children("#role").prop("contenteditable", "false");
      $(this).parents("tr").find("#userrole").prop("disabled", false);
    });
  } else {
    $.each(currentTD, () => {
      currentTD.prop("contenteditable", "false");
      $(this).parents("tr").find(".Cancel").hide();
      $(this).parents("tr").find(".delete").show();
      $(this).parents("tr").find("#userrole").prop("disabled", true);
    });
    let userrole = document.getElementById("userrole") as HTMLSelectElement;
    userrole.disabled = true;
    let firstName = $(this).parents("tr").find("#firstname").html();
    let middleName = $(this).parents("tr").find("#middlename").html();
    let lastName = $(this).parents("tr").find("#lastname").html();
    let email = $(this).parents("tr").find("#email").html();
    let phoneNumber = Number($(this).parents("tr").find("#phonenumber").html());
    let role: any = $(this).parents("tr").find("#userrole").val();
    let address = $(this).parents("tr").find("#address").html();
    const obj = UserDetail.users.filter((user) => user.id == id)[0];
    console.log(obj);
    UserDetail.prototype.update(
      new UserModel(
        id,
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
        role,
        address
      )
    );
  }
  $(this).html($(this).html() == "Edit" ? "Save" : "Edit"); //save and cancel

  //CANCEL BUTTON
  $("#user-table").on("click", ".Cancel", function () {
    let index: any;
    UserDetail.users.forEach((element) => {
      if (element.id == id) {
        index = UserDetail.users.findIndex((item) => item.id === element.id);
      }
    });
    //for previous values
    let original = [
      UserDetail.users[index].firstName,
      UserDetail.users[index].middleName,
      UserDetail.users[index].lastName,
      UserDetail.users[index].email,
      UserDetail.users[index].phoneNumber,
      UserDetail.users[index].role,
      UserDetail.users[index].address,
    ];
    $(this).hide();
    $(this).parents("tr").find(".EditSave").text("Edit");
    $(this).parents("tr").find(".delete").show();
    let i = 0;
    $.each(currentTD, () => {
      currentTD.prop("contenteditable", "false");
      $(this).parents("tr").find("#userrole").prop("disabled", true);
    });
    let userrole = document.getElementById("userrole") as HTMLSelectElement;
    userrole.disabled = true;
    $(this).parents("tr").find("#firstname").text(original[0]);
    $(this).parents("tr").find("#middlename").text(original[1]);
    $(this).parents("tr").find("#lastname").text(original[2]);
    $(this).parents("tr").find("#email").text(original[3]);
    $(this).parents("tr").find("#phonenumber").text(original[4]);
    $(this).parents("tr").find("#userrole").val(original[5]).change();
    $(this).parents("tr").find("#address").text(original[6]);
  });
});
