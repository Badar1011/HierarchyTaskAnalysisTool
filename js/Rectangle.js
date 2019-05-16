class Rectangle {
    constructor(x, y, width, height, uId, pId, getBoxesFunction) {
        // these variable are used to initialise the rectangle class
        // this is used to set the coordinates and the height and width
        // of the rectangle then it calls draw function to draw the rectangle
        this.x = x;
        this.id = uId;
        this.boxesFunction = getBoxesFunction;
        this.y = y;
        this.width = width;
        this.height = height;
        this.brightness = "#f5f5f5";
        this.parentId = pId;
        this.number = this.getNumber();
        this.message = " Write something here...";
        this.draw();
    }

    getNumber()
    {
        // find all rectangle where parent id matches to my parent id i.e. siblings
        var result = this.boxesFunction().filter( box => box.parentId == this.parentId);
        if (result.length > 0) // if statement to check if there are siblings or not
        {   // if there are then get number variable of the last sibling
            var number = result[result.length - 1].number;
            // since the number is a string split it by use decimal point as the delimeter
            var ans = number.split(".");
            if (ans.length == 1) // if statement to check if we are at level 2
            { // if we are then add 1 to the number and save it as a string
                let number00 = parseInt(number) + 1;
                return number00 + "";
            }
            else
            { // if we are not then get the last number from the split array return
                var number2 = result[result.length - 1].number;
                var ans2 = number2.split(".");
                let last = ans2[ans2.length - 1];
                // parse that string to make into a number and add 1
                let item = parseInt(last) + 1;
                // update the arry to add the new number in the last pos
                ans2[ans2.length - 1] = item + "";
                // join and return it
                number2 = ans2.join(".");
                return number2;
            }
        }
        else if (this.parentId == -1)
        { // if parent id is -1 then return 0
            return number = "0";
        }
        else if (this.parentId == 0)
        { // if parent id is 0 then return 1
            return number = "1";
        }
        else
        {   // first child of a parent get the parent number and add .1 to it
            // then return it
            var numbersd = this.findBox(this.parentId).number;
            var arr = numbersd.split(".");
            arr[arr.length] = "1";
            return arr.join(".");
        }
    }

    findBox(id) {
        return this.boxesFunction().find( box => box.id == id);
    }

    setBoxNumber(newNumber)
    {
        this.number = newNumber;
    }

    static getSelectedItem()
    {    return this.selectedItem;   }

    static getSelectedItemToDelete()
    {    return this.selectedItemToDelete;   }

    static setSelectedItem()
    {
        if (this.getSelectedItem() === 0)
        {    this.selectedItem = 1;  }
        else
        {    this.selectedItem = 0;  }
    }

    get area() {
        return this.calcArea();
    }

    get text() {
        return this.message;
    }

    setColour(newColour) {
        this.brightness = newColour;
        var rectangleToChangeColour = document.getElementById(this.id);
        rectangleToChangeColour.setAttribute("fill",this.brightness);
    }

    setX(newValue) {
        this.x = newValue;
    }


    addToMessage(char)
    {
        this.message.push(char);
    }

    deleteMessage()
    {
        this.message.pop();
    }


    setText(messageContent) {
        this.message = messageContent;
        //  this.drawMessage();
    }


    // this function gets the width and height of the foreign object
    // which is used to hold the text element
    // it uses those width and height and find the mid points of the rectangle
    // which are then used to move the text to their new position in the rectangle
    getValues()
    {
        var foreignObj = document.getElementById('foreignobject'+this.id);
        let h =  foreignObj.getAttribute('height');
        let w =  foreignObj.getAttribute('width');
        let height2 = parseInt(h);
        let width2 = parseInt(w);
        var x =  ((this.width + this.x + 10) - (this.x + width2)) / 2.0;
        x = x + this.x;
        var y  = ((this.y + this.height + 55) - (this.y + height2)) / 3.0;
         y += y + this.y;
        return [x,y];
        // x is the value of the translate value
        // y is the value of the translate value
    }

    onClicked(mouseX,mouseY) {
        // check for finish and start point of the rect i.e. not the coordinates but just like the math and also do your report
        //  let d =  distance(event.clientX,event.clientY,this.x,this.y);
        let startPointX = this.x;
        let finishPointX = this.x + this.width;
        let startPointY = this.y;
        let finishPointY = this.y + this.height;
        //  console.log(event.clientX,event.clientY,this.x,this.y, " D: " + d);
        //if ((distance(this.width,this.height,event.clientX,event.clientY) > this.width) && (distance(this.width,this.height,event.clientX,event.clientY) > this.height))
        //  let h = ((this.height));
        //  alert(h);
        console.log(mouseX, startPointX, finishPointX, mouseY, startPointY, finishPointY);
        if ((mouseX > startPointX && mouseX < finishPointX) && (mouseY > startPointY && mouseY < finishPointY))
        {
            console.log('setting colour again');
            this.setColour();
            console.log('drawing again');
            this.draw(this.x,this.y,this.width,this.height);
            console.log('it is clicked inside');
            //alert('it is clicked inside');
            return true;
        }
        else
        {
            return false;
            // alert('it is clicked outside');
            // console.log('it is clicked outside');
        }
    }
    calcArea() {
        console.log(this.x,this.y);
        return this.height * this.width;
    }



    // gets the midpoint of the rectangle
    getMidPoints() {
        var cx = this.x + (this.width / 2);
        var cy = this.y + (this.height / 2);
        return [cx,cy];
    }

    deleteBox()
    {
        this.removePath(this.id);
        this.removeRect();
        this.removeText();
    }


    removeRect()
    {
        var wholeRect = document.getElementById('g'+this.id);
        wholeRect.remove();
    }

    removeText()
    {
        var wholeText = document.getElementById('outerg'+this.id);
        wholeText.remove();
    }

    draw() {

        var bigG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        bigG.setAttribute("id","g"+this.id);



        var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute("transform","translate(0.5,0.5)");
        g.setAttribute("id","grect"+this.id);
        g.style.visibility = "visible";
        g.style.cursor = "move";

        var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute("id",this.id);
        rect.setAttribute("x",this.x);
        rect.setAttribute("y",this.y);
        rect.setAttribute("width",this.width + 10);
        rect.setAttribute("height",this.height + 55);
        rect.setAttribute("fill",this.brightness);
        rect.setAttribute("stroke","#000000");
        rect.setAttribute("pointer-events","all");

        Rectangle.selectedItem = 0;

        var offset = undefined;
        rect.addEventListener('mousedown',function (event) {
            Rectangle.selectedItem = 1;
            offset = getMousePosition(event);
            offset.x -= parseFloat(rect.getAttribute("x"));
            offset.y -= parseFloat(rect.getAttribute("y"));
            console.log("In mouse down: selected item value is:   "+ Rectangle.getSelectedItem());
        }, false);



        rect.addEventListener('click',function (event) {
            Rectangle.selectedItemToDelete = this.id;
            // change this to number variable later on
            document.getElementById('labelParentId').innerHTML = "Parent Id Selected: " + this.number;
            console.log("value selected to delete:   " + Rectangle.selectedItemToDelete);
        }.bind(this), false);



        rect.addEventListener('mousemove',function (event) {
            if (Rectangle.getSelectedItem() === 1)
            {
                event.preventDefault();
                console.log(Rectangle.getSelectedItem());
                console.log(event.clientX,event.clientY);
                console.log("mousemove");
                var coord = getMousePosition(event);
                rect.setAttribute("x", coord.x - offset.x);
                rect.setAttribute("y", coord.y - offset.y);
                this.x = coord.x - offset.x;
                this.y = coord.y - offset.y;
                var g = document.getElementById('innerg'+this.id);
                var values = this.getValues();
                console.log(values[0],values[1]);
                g.setAttribute("transform","translate("+(values[0])+","+(values[1])+")");



                this.removePath(this.id);
                //     document.removeChild(document.getElementById('pathg'+this.id));
                this.drawLines(this.id,this.parentId);
                let i =0;
                var allBoxes = this.boxesFunction();
                for (i;i<allBoxes.length;i++)
                {
                    var child = allBoxes[i];
                    if (child.parentId == this.id)
                    {
                        console.log(child.parentId,this.id);
                        this.removePath(child.id);
                        this.drawLines(child.id,this.id);
                    }
                }

            }
        }.bind(this), false);

        rect.addEventListener('mouseup',function (event) {
            Rectangle.selectedItem = 0;
            console.log("In mouse up: selected item value is:   "+ Rectangle.getSelectedItem());
        }, false);

        rect.addEventListener('mouseleave',function (event) {
            Rectangle.selectedItem = 0;
            console.log("In mouse leave: selected item value is:   "+ Rectangle.getSelectedItem());
        }, false);

        g.appendChild(rect);
        bigG.appendChild(g);
        document.getElementById('svgtag').insertAdjacentElement('afterbegin',bigG);
    }





    moveBox(y)
    {

        var rect = document.getElementById(this.id);
        console.log(y);
        let newY = parseInt(y);
        this.y = newY;
        rect.setAttribute('y',newY);

        var g = document.getElementById('innerg'+this.id);
        var values = this.getValues();
        console.log(values[0],values[1]);
        g.setAttribute("transform","translate("+(values[0])+","+(values[1])+")");

        this.removePath(this.id);
        this.drawLines(this.id,this.parentId);
        let i =0;
        var allBoxes = this.boxesFunction();
        for (i;i<allBoxes.length;i++)
        {
            var child = allBoxes[i];
            if (child.parentId == this.id)
            {
                this.removePath(child.id);
                this.drawLines(child.id,this.id);
            }
        }
    }


    removePath(id)
    {
        if (document.getElementById('pathg'+id) !== null)
        {
            let element = document.getElementById('pathg'+id);
            element.parentNode.removeChild(element);
        }
    }



    drawMessage()
    {
        var outerG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        outerG.setAttribute('id','outerg'+this.id);
        outerG.style.visibility = "visible";
        outerG.style.cursor = "move";
        outerG.style.pointerEvents = "none";

        var innerG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        innerG.setAttribute('id','innerg'+this.id);
        innerG.setAttribute("transform","translate("+(this.x+2)+","+(this.y+25)+")");
        innerG.style.pointerEvents = "none";

        var foreignObj = document.createElementNS('http://www.w3.org/2000/svg',"foreignObject");
        foreignObj.setAttribute("width",this.width);
        foreignObj.setAttribute("id","foreignobject" + this.id);
        foreignObj.setAttribute("height",this.height);
        foreignObj.setAttribute("pointer-events","all");
        foreignObj.style.overflow = "visible";
        foreignObj.style.pointerEvents = "none";

        var outerDiv = document.createElement("div");
        //  outerDiv.style.display = "inline-block";
        outerDiv.setAttribute('id','outerdiv'+this.id);
        outerDiv.style.fontSize = "12px";
        outerDiv.style.fontFamily = "Helvetica";
        outerDiv.style.color = "rgb(0, 0, 0)";
        outerDiv.style.lineHeight = "1.2";
        outerDiv.style.verticalAlign = "top";
        outerDiv.style.width = this.width;
        outerDiv.style.whiteSpace = "normal";
        outerDiv.style.textAlign = "center";
        outerDiv.style.pointerEvents = "stroke";

        var n = document.createTextNode(this.number);

        var message = document.createTextNode(this.message);


        var p = document.createElement("p");
        p.style.margin = 0;
        p.setAttribute('id','innerp'+this.id);


        p.appendChild(n);

        var innerDiv = document.createElement("div");
        innerDiv.style.display = "inline-block";
        innerDiv.style.textAlign = "inherit";
        innerDiv.style.textDecoration = "inherit";
        innerDiv.setAttribute("contenteditable","true");
        innerDiv.setAttribute("xmlns","http://www.w3.org/1999/xhtml");

        innerDiv.addEventListener('DOMSubtreeModified',function (event) {
            console.log(innerDiv.innerHTML);
            this.setText(innerDiv.innerHTML);
            /*
              this.width = innerDiv.scrollWidth;
              var rect = document.getElementById(this.id);
              foreignObj.setAttribute("width",innerDiv.scrollWidth);
              foreignObj.setAttribute("height",innerDiv.scrollHeight);
              rect.setAttribute("width",this.width);*/
            console.log("message: " + this.message);
        }.bind(this),false);


        innerDiv.addEventListener('keypress',function (event) {
            // this checks how big the width is and then assign to width var

           // alert(innerDiv.scrollWidth);
            if (innerDiv.scrollWidth > 130)
            {
                this.width = innerDiv.scrollWidth;
            }
            // this checks how big the height is and then assign to width var
            if (innerDiv.scrollHeight > 60)
            {
                this.height = innerDiv.scrollHeight;
            }
            var rect = document.getElementById(this.id);
            // sets the new width and height
            rect.setAttribute("width",this.width + 10);
            rect.setAttribute("height",this.height + 55);
            foreignObj.setAttribute("width",this.width);
            foreignObj.setAttribute("height",this.height);
            // this gets the text new position and move the text to it
            let innerg = document.getElementById('innerg'+this.id);
            var values =  this.getValues();
            innerg.setAttribute("transform","translate("+(values[0])+","+(values[1])+")");
            // as the box is moved its old path is deleted to its parent and children
            // new path is drawn
            this.removePath(this.id);
            this.drawLines(this.id,this.parentId);
            let i =0;
            // this is to go over all the childrens and delete their path and redraw them
            var allBoxes = this.boxesFunction();
            for (i;i<allBoxes.length;i++)
            {
                var child = allBoxes[i];
                if (child.parentId == this.id)
                {
                    console.log(child.parentId,this.id);
                    this.removePath(child.id);
                    this.drawLines(child.id,this.id);
                }
            }
        }.bind(this),false);
        innerDiv.appendChild(message);
        outerDiv.appendChild(p);
        outerDiv.appendChild(innerDiv);
        foreignObj.appendChild(outerDiv);
        innerG.appendChild(foreignObj);
        outerG.appendChild(innerG);
        document.getElementById('svgtag').appendChild(outerG);
    }

    // get distance between two rectangle
    // when given the midpoints
    getDistance(cx1,cy1,cx2,cy2) {
        var dx = cx2 - cx1;
        var dy = cy2 - cy1;
        return {
            dx: dx,
            dy: dy
        }
    }


    drawLines(aRect, aR)
    {
        if (aR !== -1) // if statement to check if the rect id isnt -1 which is the id for the root node
        {
            // find the rectangle object
            var rect = this.findBox(aRect);
            // find its parents object
            var r = this.findBox(aR);
            // find mid points of both the rect
            const midPoints = rect.getMidPoints();
            const rootMidPoints = r.getMidPoints();
            // find distance using the mid points
            var distance = this.getDistance(midPoints[0],midPoints[1],rootMidPoints[0],rootMidPoints[1]);
            var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            distance.dx =  -distance.dx;
            distance.dy =  -distance.dy;
            let straightDown = distance.dy / 2.0;
            // draw the new path using distance found
            path.setAttribute("d","M 0 0 L 0 " + straightDown + " L " + distance.dx + " " +
                straightDown + " L " + distance.dx + " " + distance.dy);
            path.setAttribute("stroke-width","1");
            path.setAttribute("stroke","#0b0c0c");
            path.setAttribute("fill","none");
            var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute('id','pathg'+rect.id);
            // translate the path to the correct position
            g.setAttribute("transform","translate("+rootMidPoints[0]+","+rootMidPoints[1]+")");
            g.appendChild(path);
            document.getElementById("g"+rect.id).insertAdjacentElement('afterbegin',g);
        }
    }
}


Rectangle.selectedItemToDelete = 0;