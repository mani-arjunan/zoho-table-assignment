console.log('class')

class App {

    constructor(isGrid, data) {
        this.isGrid = isGrid
        this.data = data
    }

    createGrid = (data) => {
        var main = document.getElementById("demo-grid");
        for (var i = 0; i < data.length; i++) {
            var value = data[i]
            var dv = document.createElement('div')
            dv.className = "grid";
            for (var j = 0; j < 3; j++) {
                var text
                switch (j) {
                    case 0: {
                        var para = document.createElement('img')
                        para.className = "image";
                        text = value.image
                        para.src = text
                        dv.appendChild(para)
                        break;
                    }
                    case 1: {
                        var para = document.createElement('p')
                        para.className = "name"
                        text = value.name
                        para.title = text
                        para.innerText = text
                        dv.appendChild(para)
                        break;
                    }
                    case 2: {
                        var para = document.createElement('p')
                        para.className = "description";
                        text = value.description
                        para.title = text
                        para.innerText = text
                        dv.appendChild(para)
                        break;
                    }

                }
            }
            i === data.length - 1 ? dv.id = "last" : null
            main.appendChild(dv)
        }
    }

    callApi = (ev) => console.log('ev', ev)

    searchGrid = () => {
        var input = document.getElementById("myInput");
        var filter = input.value.toUpperCase();
        var grid = document.getElementsByClassName('grid')
        for (var i = 0; i < grid.length; i++) {
            var p = grid[i].getElementsByTagName("p")[0];
            if (p) {
                var txtValue = p.textContent || p.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    grid[i].style.display = "";
                } else {
                    grid[i].style.display = "none";
                }
            }
        }
    }


    searchTable = () => {
        var input = document.getElementById("myInput");
        var filter = input.value.toUpperCase();
        var table = document.getElementById("myTable");
        var tr = table.getElementsByTagName("tr");
        for (var i = 0; i < tr.length; i++) {
            var td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                var txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

    comparer = (idx, asc) => (a, b) => ((v1, v2) =>
        v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(myApp.getCellValue(asc ? a : b, idx), myApp.getCellValue(asc ? b : a, idx));

    getData = async (isGrid) => {
        await fetch('http://run.mocky.io/v3/6f7a76ed-d6f5-4b54-be23-bf9a141c982a')
            .then(response => response.json())
            .then(data => {
                myApp.data = data
                !isGrid ? myApp.createGrid(data) : myApp.createTable(data)
            });
    }

    createTable = (data) => {
        var main = document.getElementById("demo-table");
        var table = document.createElement('table')
        table.id = "myTable"
        var tableHeading = document.createElement('thead')
        var row = document.createElement('tr')
        var heading1 = document.createElement('th')
        heading1.innerText = 'image'
        var heading2 = document.createElement('th')
        heading2.id = 'sort'
        heading2.innerText = 'name'
        var heading3 = document.createElement('th')
        heading3.innerText = 'description'
        row.appendChild(heading1)
        row.appendChild(heading2)
        row.appendChild(heading3)
        tableHeading.appendChild(row)
        table.appendChild(tableHeading)
        for (var i = 0; i < data.length; i++) {
            var value = data[i]
            var row = document.createElement('tr')
            row.className = "grid";
            for (var j = 0; j < 3; j++) {
                var text
                switch (j) {
                    case 0: {
                        var heading = document.createElement('td')
                        var para = document.createElement('img')
                        para.className = "image";
                        text = value.image
                        para.src = text
                        heading.appendChild(para)
                        row.appendChild(heading)
                        break;
                    }
                    case 1: {
                        var heading = document.createElement('td')
                        heading.className = "name";
                        text = value.name
                        heading.innerHTML = text
                        row.appendChild(heading)
                        break;
                    }
                    case 2: {
                        var heading = document.createElement('td')
                        heading.className = "description";
                        text = value.description
                        heading.innerHTML = text
                        row.appendChild(heading)
                        break;
                    }
                }
            }
            table.appendChild(row)
        }
        main.appendChild(table)

        const nameRow = document.getElementById('sort')

        nameRow.addEventListener('click', (() => {
            const table = nameRow.closest('table');
            Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
                .sort(myApp.comparer(Array.from(nameRow.parentNode.children).indexOf(nameRow), this.asc = !this.asc))
                .forEach(tr => table.appendChild(tr));
        }));
    }
}