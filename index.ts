type Product = {
  id: number;
  title: string;
  description: string;
  brand: string;
  category: string;
};

const products: Product[] = [];

function fetchData(): void {
  fetch("https://dummyjson.com/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
      const resData: Product[] = json.products;
      resData.map((item: Product) => {
        products.push({
          id: item.id,
          title: item.title,
          description: item.description,
          brand: item.brand,
          category: item.category,
        });
      });
      hideLoader();
    })
    .catch((error) => {
      alert(error);
    });
}

function hideLoader(): void {
  const loaderDiv = document.getElementById("loaderDiv")! as HTMLDivElement;
  loaderDiv.style.display = "none";
  showTable();
}

function showTable(): void {
  const table = document.createElement("table")! as HTMLTableElement;
  const tableBody = document.createElement("tbody")! as HTMLTableSectionElement;
  table.appendChild(tableBody);

  const header: string[] = ["ID", "Title", "Description", "Brand", "Category"];

  const tr = document.createElement("tr")! as HTMLTableRowElement;
  for (let i = 0; i < header.length; i++) {
    let th = document.createElement("th")! as HTMLTableCellElement;
    th.appendChild(document.createTextNode(header[i])! as Text);
    tr.appendChild(th);
    tableBody.appendChild(tr);
  }

  for (let i = 0; i < products.length; i++) {
    const tr = document.createElement("tr")! as HTMLTableRowElement;
    for (let j = 0; j < Object.keys(products[i]).length; j++) {
      const td = document.createElement("td")! as HTMLTableCellElement;
      td.appendChild(
        document.createTextNode(
          products[i][Object.keys(products[i])[j]]! as string
        )
      );
      tr.appendChild(td);
    }
    tableBody.appendChild(tr);
  }

  const productsTable = document.getElementById(
    "productsTable"
  )! as HTMLDivElement;

  productsTable.appendChild(table);
  productsTable.style.display = "block";
}

fetchData();
