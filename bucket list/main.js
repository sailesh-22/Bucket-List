var giventask = document.getElementById("lists");
var given = document.getElementById("given");
var count = 0;
var donecount = 0;

document.addEventListener("DOMContentLoaded", () => {


    const fetcheduserName = JSON.parse(localStorage.getItem("userName"));

    fetcheduserName.forEach(item => {

        var pname = document.getElementById("pname");

        pname.style.color = "red";

        pname.style.textShadow = "1px 1px silver";

        pname.innerHTML = item.user_name;


    });

})
document.addEventListener("DOMContentLoaded", () => {

    const fetchedpic = [...JSON.parse(localStorage.getItem("profile_pic"))];

    fetchedpic.forEach(item => {

        img.setAttribute('src', item.pic);

    })


})

document.addEventListener("DOMContentLoaded", () => {

    const fetchlist = [...JSON.parse(localStorage.getItem("Lists"))];

    fetchlist.forEach(item => {

        count++;

        var list = document.createElement("div");

        list.className = "list";

        list.classList.add("list" + count);

        list.style.boxShadow = " 1px 1px 1px 1px gray";

        giventask.appendChild(list);

        var p = document.createElement("p");

        list.appendChild(p);

        p.innerHTML = item.List;

        p.style.color = "black";

        p.style.textAlign = "center";


        // creating delete button

        var del = document.createElement("button");

        del.className = "buttons";

        del.classList.add("button" + count);

        del.innerHTML = "Delete";

        del.setAttribute("onclick", "dele();")

        giventask.appendChild(del);


        // creating done button
        var done = document.createElement("button");

        done.className = "buttons";

        done.classList.add("button" + count);

        done.innerHTML = "Done";

        done.onclick = function donee() {

            donecount++;

            del.style.display = "none";

            done.style.display = "none";

            document.getElementById("finished").innerHTML = donecount;

            list.style.opacity = "70%";

            p.innerHTML = item.List;

            p.style.textAlign = "center";

            p.style.color = "gray";

            list.style.transition = "00.5s";

            localStorage.setItem(
                "donelists",
                JSON.stringify([
                    ...JSON.parse(localStorage.getItem("donelists") || "[]"),
                    { donelist: item.List },
                ])

            );


            const fetchdonelist = [...JSON.parse(localStorage.getItem("donelists"))];

            fetchdonelist.forEach(ele => {

                const fetchlist = [...JSON.parse(localStorage.getItem("Lists"))];

                fetchlist.forEach((item) => {

                    if (item.List === ele.donelist) {
                        window.location.reload();
                        fetchlist.splice(fetchlist.indexOf(item), 1);
                    }


                });

                localStorage.setItem("Lists", JSON.stringify(fetchlist));
                localStorage.setItem(
                    "donecount",
                    JSON.stringify([

                        { count: fetchdonelist.length },
                    ])

                );

                document.getElementById("finished").innerHTML = fetchdonelist.length;

                window.location.reload();

            });





        }
        giventask.appendChild(done);

        document.getElementById("todo").innerHTML = count;

        given.value = "";


        del.onclick = function dele() {
            // to add confrim alert message
            let text = "Are you sure to delete this task ?";

            if (confirm(text) == true) {

                window.location.reload();

                const ptext = p.innerText;

                count--;

                document.getElementById("todo").innerHTML = count;

                del.remove();

                done.remove();

                list.remove();

                const fetchlist = [...JSON.parse(localStorage.getItem("Lists"))];

                fetchlist.forEach((item) => {

                    if (item.List === ptext) {

                        fetchlist.splice(fetchlist.indexOf(item), 1);
                    }


                });
                localStorage.setItem("Lists", JSON.stringify(fetchlist));

                window.location.reload();

            }


        }


    });

    const fetchdonelist = [...JSON.parse(localStorage.getItem("donelists"))];

    fetchdonelist.forEach(item => {



        var list = document.createElement("div");

        list.className = "list";

        list.classList.add("list" + count);

        giventask.appendChild(list);

        var p = document.createElement("p");

        list.appendChild(p);

        list.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

        p.innerHTML = item.donelist;

        p.style.textAlign = "center";
        // alter
        p.style.color = "rgb(210, 210, 210)";

        list.style.transition = "00.5s";

        var removedone = document.createElement("button");

        removedone.innerHTML = "x";

        removedone.style.justifyItems = "center";


        removedone.onclick = function deldone() {


            let text = "Are you sure to remove  ?";

            if (confirm(text) == true) {

                window.location.reload();

                const ptext = p.innerText;

                document.getElementById("todo").innerHTML = donecount;

                list.remove();


                const fetchdonelist = [...JSON.parse(localStorage.getItem("donelists"))];
                if (fetchdonelist === {}) {
                    localStorage.removeItem("donelists");
                }


                fetchdonelist.forEach((item) => {


                    if (item.donelist === ptext) {

                        fetchdonelist.splice(fetchdonelist.indexOf(item), 1);

                    }

                    localStorage.setItem("donelists", JSON.stringify(fetchdonelist));

                    localStorage.setItem(
                        "donecount",
                        JSON.stringify([

                            { count: fetchdonelist.length },
                        ]))

                });



            }




        }
        list.appendChild(removedone);



    })
    const fetchdonecount = [...JSON.parse(localStorage.getItem("donecount"))];

    fetchdonecount.forEach(item => {

        document.getElementById("finished").innerHTML = item.count;

    })

})


function add() {

    window.location.reload();

    if (!(given.value)) {

        alert("first enter your task!");

    } else {

        count++;

        var list = document.createElement("div");

        list.className = "list";

        list.classList.add("list" + count);

        giventask.appendChild(list);

        var p = document.createElement("p");

        list.appendChild(p);

        p.innerHTML = given.value;

        p.style.color = "black";

        p.style.textAlign = "center";

        localStorage.setItem(
            "Lists",
            JSON.stringify([
                ...JSON.parse(localStorage.getItem("Lists") || "[]"),
                { List: given.value },
            ])

        );



        // creating delete button

        var del = document.createElement("button");

        del.className = "buttons";

        del.classList.add("button" + count);

        del.innerHTML = "Delete";

        giventask.appendChild(del);

        del.onclick = function dele() {


            console.log(p.innerText);

            // to add confrim alert message
            let text = "Are you sure to delete this task ?";
            if (confirm(text) == true) {

                count--;

                del.remove();

                done.remove();

                list.remove();

                document.getElementById("todo").innerHTML = count;

                window.location.reload();

            }


        }


        // creating done button
        var done = document.createElement("button");

        done.className = "buttons";

        done.classList.add("button" + count);

        done.innerHTML = "Done";

        done.onclick = function donee() {

            window.location.reload();

            donecount++;

            var div = "button" + count;

            del.style.display = "none";

            done.style.display = "none";

            document.getElementById("finished").innerHTML = donecount;

            list.style.opacity = "70%";

            p.style.color = "white";

            list.style.transition = "00.5s";

            localStorage.setItem(
                "donelists",
                JSON.stringify([
                    ...JSON.parse(localStorage.getItem("donelists") || "[]"),
                    { donelist: item.List },
                ])

            );




        }
        giventask.appendChild(done);

        document.getElementById("todo").innerHTML = count;

        given.value = "";


    }
}



function edit() {

    var pname = document.getElementById("pname");

    let person = prompt("please enter your name :");

    if (person == null || person == "") {

        pname.innerHTML = "#name";

    } else {
        pname.style.color = "red";

        pname.style.textShadow = "1px 1px silver";

        pname.innerHTML = person;

        localStorage.setItem(
            "userName",
            JSON.stringify([

                { user_name: person },
            ])

        );

    }

}

const imgdiv = document.querySelector("#photo");
const img = document.querySelector("#pic");
const file = document.querySelector("#file");
const upload = document.querySelector("#upload");


imgdiv.addEventListener('mouseenter', function() {

    upload.style.display = "block";

})
imgdiv.addEventListener('mouseleave', function() {

    upload.style.display = "none";

})

file.addEventListener('change', function() {

    const choosedfile = this.files[0];

    if (choosedfile) {

        const reader = new FileReader();



        reader.addEventListener('load', function() {

            localStorage.setItem(
                "profile_pic",
                JSON.stringify([
                    { pic: reader.result },
                ])
            )
            window.location.reload();


        });

        reader.readAsDataURL(choosedfile);

    }

})