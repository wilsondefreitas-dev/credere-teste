window.onload = () => {

    writeForm();

    setTimeout(() => Inputmask().mask(document.querySelectorAll("input")), 3000);


};

const writeForm = () => {

    document.querySelectorAll(".custon_input").forEach(element => {

        const label = element.getAttribute("label");

        const id = element.getAttribute("id");
        const type = element.getAttribute("type");
        const required = (element.getAttribute("required") === "true") || false;
        const dataInputmask = element.getAttribute("data-inputmask") || "";

        const id2 = element.getAttribute("id2");
        const type2 = element.getAttribute("type2");
        const title2 = element.getAttribute("title2");
        const required2 = (element.getAttribute("required2") === "true") || false;
        const dataInputmask2 = element.getAttribute("data-inputmask") || "";

        const addNew = (element.getAttribute("addNew") === "true") || false;
        const deleteButton = (element.getAttribute("deleteButtton") === "true") || false;

        const multiply = parseInt(element.getAttribute("multiply")) || 1;

        element.classList.add = "input_container";
        element.onkeypress = (event) => onChangeHandle(event);

        let inputs_str = '';

        for (let i = 0; i < multiply; i++) {

            inputs_str += `<div class="input_group" style="display: ${i > 0 ? 'none' : 'block'}">
                    
                    <input 
                        id="${id}" 
                        type="${type}" 
                        ${required && 'required'}
                        data-inputmask="${dataInputmask}"
                        style="width:${(!id2 && !addNew) ? '100%' : 'auto'}"
                    />

                    ${id2 ? `

                        <input 
                            id="${id2}" 
                            type="${type2}" 
                            ${required2 && 'required'}
                            data-inputmask="${dataInputmask2}"
                            style="width:${(!id2 && !addNew) ? '100%' : 'auto'}"
                        /> 

                        ${title2 ? `
                            
                            <label for="${id2}">
                                ${title2}
                            </label>
                        
                        `: ''} 
                        
                    ` : ''}

                    ${deleteButton ? `

                        <div class="extra_button">
                            | <u>Excluir</u>
                        </div>
                        
                    ` : ''}

                </div>`;

        }

        element.innerHTML = `
            <div class="input_container">

                <label for="${id}">
                    ${label}
                </label>

                    ${inputs_str}

                    ${addNew ? `
                            <div class="input_group">
                                <u class="extra_button" type="button" name="add" id="add">
                                    Adicionar Novo
                                </u>
                            </div>
                        ` : ''}

                </div>

            </div>`;

    });


}


onChangeHandle = function (event) {

    console.log(event);


}