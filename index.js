
let width = 16;
let height = 16;
let active =false;
let selectedColor;
let divColor;
let root = document.querySelector(":root");
let download = false;

const body = document.querySelector("body");
body.addEventListener("load" , createGrid(width, height));
body.addEventListener("load" , colors());
body.addEventListener("load" , addClearGridButton());
body.addEventListener("load" , addChangeGridButton());
body.addEventListener("load" , addWidthAndHeightInput());
body.addEventListener("load" , addSaveButton());
const container = document.getElementById("container");

function createGrid(width, height)
{
    let numGrids = width * height;
    for(let i = 0; i < numGrids; i++)
    {
        const container = document.getElementById("container");
        const div = document.createElement("div");
        div.addEventListener("mouseover", () => {
            if(active)
            {
                div.style.backgroundColor = selectedColor.style.backgroundColor;
                div.style.outline = "10px solid " + selectedColor.style.backgroundColor;
            }
                div.style.outline = "4px solid #7c7b7b";
                div.style.zIndex = "5";
        });
        div.addEventListener("mouseleave", () => {
            div.style.outline = "1px solid #7c7b7b11";
            div.style.zIndex = "0";
        });
        div.addEventListener("click", () => {
            div.style.backgroundColor = selectedColor.style.backgroundColor;
           if(active)
           {
               active = false;
           }
           else
           {
               active = true;
           }
        }); 
        div.setAttribute("style", "flex: 1 1 " + (100/width) + "%;");
        div.setAttribute("class", "gridItem");
        container.append(div);
    }
}

function clearGrid() 
{
    while(container.lastChild)
    {
        container.removeChild(container.lastChild);
    }
}

function gridSize()
{
    if(width > 100 || width ===  null || width == "")
    {
        width = 100;
    }
    if(height > 100 || height === null || height == "")
    {
        height = 100;
    }
}

function colors()
{
    let colors = ["black", "white", "rgb(119, 71, 0)", "red", "blue", "green", "yellow", "orange"];
    for(let i = 0; i < colors.length; i++)
    {
        const colorHolder = document.getElementById("colorHolder");
        const colorSelect = document.createElement("button");
        colorSelect.style.backgroundColor = colors[i];
        colorSelect.style.borderRadius = "50%";
        colorSelect.style.height = "50px";
        colorSelect.style.width = "50px";
        colorSelect.addEventListener("click", () => {
            selectedColor.style.opacity = "100%";
            selectedColor = colorSelect;
            active = false;
            colorSelect.style.opacity = "25%"
            
        });
        colorSelect.setAttribute("class", "colors");
        if(colors[i] == "black")
        {
            selectedColor = colorSelect;
            colorSelect.style.opacity = "25%"
        }
        colorHolder.append(colorSelect);
    }
}

function addClearGridButton()
{
    const buttonHolder = document.getElementById("buttonHolder");
    const clearButton = document.createElement("button");
    clearButton.textContent = "Clear Grid";
    clearButton.addEventListener("click", () => {
        active = false;
        clearGrid();
        createGrid(width, height);
    });
    buttonHolder.append(clearButton);
}

function addChangeGridButton()
{
    const buttonHolder = document.getElementById("buttonHolder");
    const clearButton = document.createElement("button");
    clearButton.textContent = "Change Grid";
    clearButton.addEventListener("click", () => {
        active = false;
        clearGrid();
        gridSize();
        createGrid(width, height);
    });
    buttonHolder.append(clearButton);
}

function addWidthAndHeightInput()
{
    const buttonHolder = document.getElementById("buttonHolder");
    const widthInput = document.createElement("input");
    widthInput.setAttribute("placeholder", "Width");
    widthInput.setAttribute("type", "text");
    widthInput.setAttribute("maxlength", "3");
    widthInput.addEventListener("change", () => {
        width = widthInput.value;
    });
    buttonHolder.append(widthInput);

    const heightInput = document.createElement("input");
    heightInput.setAttribute("placeholder", "Height");
    heightInput.setAttribute("type", "text");
    widthInput.setAttribute("maxlength", "3");
    heightInput.addEventListener("change", () => {
        height = heightInput.value;
    });
    buttonHolder.append(heightInput);
}

function addSaveButton()
{
    const buttonHolder = document.getElementById("buttonHolder");
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save Drawing";
    saveButton.addEventListener("click", () => {
       screenShot(link);
       active = false;
    });
    const link = document.createElement("a");
    link.setAttribute("download", "screenshot.png");
    link.setAttribute("href", "#");
    link.addEventListener("click", () => {
        download = true;
    });
    saveButton.append(link);
    buttonHolder.append(saveButton);
}

function screenShot(link)
{
    html2canvas(document.getElementById("container")).then(canvas => {
        let url = canvas.toDataURL("image/png");
        link.href = url;
        if(!download)
        {
            link.click();
        }
        else
        {
            download = false;
        }
    });
}