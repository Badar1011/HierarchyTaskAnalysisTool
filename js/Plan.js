class Plan
{
    // these variable are used to initialise the plan class
    // this is used to set the coordinates and the height and width
    // of the rectangle then it calls draw plan function to draw the plan
    constructor(x,y,width,height,message,id,number)
    {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.number = number;
        if (message == "")
        {
            this.message = "Write your plan here";
        }
        else
        {
            this.message = message;
        }
        this.drawPlan();
    }

    static getSelectedItem()
    {
        return this.selectedItem;
    }

    drawPlan()
    {
        var planouterG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        planouterG.setAttribute('id','planOuterg'+this.id);
        planouterG.style.visibility = "visible";
        planouterG.style.cursor = "move";
        planouterG.style.pointerEvents = "none";

        var planInnerG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        planInnerG.setAttribute('id','planInnerg'+this.id);
        planInnerG.setAttribute("transform","translate("+(this.x+2)+","+(this.y+25)+")");
        planInnerG.style.pointerEvents = "none";

        var planForeignObj = document.createElementNS('http://www.w3.org/2000/svg',"foreignObject");
        planForeignObj.setAttribute("id","planForeignobject" + this.id);
        planForeignObj.setAttribute("width",this.width);
        planForeignObj.setAttribute("height",this.height);
        planForeignObj.setAttribute("pointer-events","all");
        planForeignObj.style.overflow = "visible";
        planForeignObj.style.pointerEvents = "none";

        var planOuterDiv = document.createElement("div");
        planOuterDiv.setAttribute('id','outerdiv'+this.id);
        planOuterDiv.style.fontSize = "12px";
        planOuterDiv.style.fontFamily = "Helvetica";
        planOuterDiv.style.color = "rgb(0, 0, 0)";
        planOuterDiv.style.lineHeight = "1.2";
        planOuterDiv.style.verticalAlign = "top";
        planOuterDiv.style.width = this.width;
        planOuterDiv.style.whiteSpace = "normal";
        planOuterDiv.style.textAlign = "center";
        planOuterDiv.style.pointerEvents = "stroke";

        var n = document.createTextNode(this.number);

        var message = document.createTextNode(this.message);

        var p = document.createElement("p");
        p.style.margin = 0;
        p.setAttribute('id','planInnerp'+this.id);

        p.appendChild(n);

        var planInnerDiv = document.createElement("div");
        planInnerDiv.style.display = "inline-block";
        planInnerDiv.style.textAlign = "inherit";
        planInnerDiv.style.textDecoration = "inherit";
        planInnerDiv.setAttribute("contenteditable","true");
        planInnerDiv.setAttribute("xmlns","http://www.w3.org/1999/xhtml");

        var offset = undefined;

        planInnerDiv.addEventListener('mousedown',function (event) {
            Plan.selectedItem = 1;
            offset = getMousePosition(event);
            offset.x -= parseFloat(this.x);
            offset.y -= parseFloat(this.y);
            console.log("In mouse down: IN PLAN :   "+ Plan.getSelectedItem());
        }.bind(this), false);

        planInnerDiv.addEventListener('mousemove',function (event) {
            if (Plan.getSelectedItem() === 1)
            {
                event.preventDefault();
                console.log(Plan.getSelectedItem());
                console.log(event.clientX,event.clientY);
                console.log("mousemove");
                var coord = getMousePosition(event);
                console.log("checking the x and y values in mousemove"+this.x,this.y);
                planInnerG.setAttribute("transform","translate("+(this.x+2)+","+(this.y+25)+")");
                this.x = coord.x - offset.x;
                this.y = coord.y - offset.y;
            }
        }.bind(this), false);

        planInnerDiv.addEventListener('mouseup',function (event) {
            Plan.selectedItem = 0;
            console.log("In mouse up: IN PLAN :   "+ Plan.getSelectedItem());
        }, false);

        planInnerDiv.addEventListener('mouseleave',function (event) {
            Plan.selectedItem = 0;
            console.log("In mouse leave: IN PLAN :   "+ Plan.getSelectedItem());
        }, false);

        planInnerDiv.addEventListener('DOMSubtreeModified',function (event) {
            console.log(planInnerDiv.innerHTML);
            this.setText(planInnerDiv.innerHTML);
            console.log("message in plan: " + this.message);
        }.bind(this),false);

        planInnerDiv.addEventListener('keypress',function (event) {
            console.log("key pressssssssssssssed in plan");
            if (planInnerDiv.scrollWidth > 100)
            {
                this.width = planInnerDiv.scrollWidth;
            }
            // this checks how big the height is and then assign to width var
            if (planInnerDiv.scrollHeight > 50)
            {
                this.height = planInnerDiv.scrollHeight;
            }


            planForeignObj.setAttribute("width",this.width);
            planForeignObj.setAttribute("height",this.height);
        }.bind(this),false);

        planInnerDiv.appendChild(message);
        planOuterDiv.appendChild(p);
        planOuterDiv.appendChild(planInnerDiv);
        planForeignObj.appendChild(planOuterDiv);
        planInnerG.appendChild(planForeignObj);
        planouterG.appendChild(planInnerG);
        document.getElementById('svgtag').appendChild(planouterG);
    }

    setText(messageContent) {
        this.message = messageContent;
    }

    deletePlan()
    {
        var wholeElement = document.getElementById("planOuterg"+this.id);
        wholeElement.remove();
    }
}

Plan.selectedItem = 0;