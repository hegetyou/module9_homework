const parser = new DOMParser();

const xmlString = `<list>
                        <student>
                            <name lang="en">
                                <first>Ivan</first>
                                <second>Ivanov</second>
                            </name>
                                <age>35</age>
                                <prof>teacher</prof>
                        </student>
                        <student>
                            <name lang="ru">
                                <first>Петр</first>
                                <second>Петров</second>
                            </name>
                                <age>58</age>
                                <prof>driver</prof>
                        </student>
                    </list>`;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const studentNodes = xmlDOM.querySelectorAll("student");

const result = {list: []};

for (let node of studentNodes) {

const nameNode = node.querySelector("name");
const nameAttr = nameNode.getAttribute("lang");
const firstNode = node.querySelector("first");
const secondNode = node.querySelector("second");
const ageNode = node.querySelector("age");
const profNode = node.querySelector("prof");

const tmp = {
    name: firstNode.textContent+' '+secondNode.textContent,
    age: Number(ageNode.textContent),
    prof: profNode.textContent,
    lang: nameAttr
    };

    result.list.push(tmp);	
}

console.log('result', result);