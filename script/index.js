(function () {

    window.onload = () => {

        writeForm();
        activateInputMask();

    };

    const activateInputMask = () => {

        setTimeout(() => Inputmask().mask(document.querySelectorAll("input")), 100);

    };

    const checkAge = (dateOfBirth, dependent) => {

        const age = Math.floor((new Date().getTime() - new Date(dateOfBirth).getTime()) / (365 * 24 * 60 * 60 * 1000));
        document.querySelector(`#container_${dependent}`).style.display = (age >= 18 && age.toString().length <= 2) ? 'block' : 'none';

    };

    const writeForm = () => {

        document.querySelectorAll(".custon_input").forEach(element => {

            const getAttr = (attr) => element.getAttribute(attr);

            const label = getAttr("label");

            const id = [getAttr("id"), getAttr("id2")],
                type = [getAttr("type"), getAttr("type2")],
                title = [getAttr("title2"), getAttr("title2")],
                required = [(getAttr("required") === "true"), (getAttr("required2") === "true")],
                dataInputmask = [(getAttr("data-inputmask") || ""), (getAttr("data-inputmask2") || "")];

            const addNew = (getAttr("addNew") === "true"),
                deleteButton = (getAttr("deleteButtton") === "true"),
                hide = (getAttr("hide") === "true"),
                dependent = (getAttr("dependent")?.split(",") || []);

            const multiply = parseInt(getAttr("multiply")) || 1;

            element.classList.add = "input_container";
            element.onkeyup = element.onchange = (event) => onChangeHandle(event);

            let inputs_str = '';
            for (let i = 0; i < multiply; i++) {

                inputs_str += `<div class="input_group" style="display: ${i > 0 ? 'none' : 'block'}">
                    
                    <input 
                        id="${id[0]}" 
                        type="${type[0]}" 
                        ${required[0] && 'required'}
                        data-inputmask="${dataInputmask[0]}"
                        style="width:${(!id[1] && !addNew) ? '100%' : 'auto'}"
                        dependent="${dependent}"
                    />

                    ${id[1] ? `

                        <input 
                            id="${id[1]}" 
                            type="${type[1]}" 
                            ${required[1] && 'required'}
                            data-inputmask="${dataInputmask[1]}"
                            style="width:${(!id[1] && !addNew) ? '100%' : 'auto'}"
                            dependent="${dependent}"
                        /> 

                        ${title[1] ? `
                            
                            <label for="${id[1]}">
                                ${title[1]}
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
            <div class="input_container" style="display: ${hide ? "none" : "block"}" id="container_${id[0]}">

                <label for="${id[0]}">
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

        const id = event.target.id;
        const dependent = event.target.getAttribute("dependent");

        switch (id) {

            case "birthday":
                checkAge(event.target.value, dependent);
                break;

            default: break;

        }

    }

})();

