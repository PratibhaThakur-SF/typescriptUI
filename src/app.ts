import { UserDetail } from "./UserDetails";

const DateTimeFormatter = (
  target: Object,
  propertykey: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;
  //wrapping original method
  descriptor.value = function (...args: any) {
    const result = originalMethod.apply(this, args);
    let dateContainer = document.getElementById("Date") as HTMLHeadElement;
    dateContainer.innerHTML += `${args[0].toLocaleString("en-US")}`; //args[0] is date
    return result;
  };
  return descriptor;
};

class MainPage {
  date: Date = new Date();
  loadBtn: HTMLButtonElement;
  refreshBtn: HTMLButtonElement;
  constructor() {
    this.loadBtn = document.querySelector("#load-btn")!;
    this.refreshBtn = document.querySelector("#refresh-btn")!;
    this.loadBtn.addEventListener("click", () => {
      this.load();
    });
    this.refreshBtn.addEventListener("click", () => {
      this.refresh();
    });
  }
  load() {
    let loadDiv = document.querySelector("#load") as HTMLDivElement;
    let userDiv = document.querySelector("#user") as HTMLDivElement;
    loadDiv.style.display = "none";
    userDiv.style.display = "block";
    UserDetail.refresh();
    this.updateDate(new Date(), this.loadBtn.innerHTML);
  }
  refresh() {
    window.location.reload();
  }
  
  @DateTimeFormatter
  updateDate(date: Date, text: String): void {
    let dateContainer = document.getElementById("Date")! as HTMLHeadElement;
    dateContainer.innerHTML = `"${text}" Button was last clicked on: `;
  }
}
new MainPage();
