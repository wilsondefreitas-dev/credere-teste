(function () {

    const inputConfig = {

        counter: {

            email: 0,
            phone: 0

        }

    };

    const brazil_states = [
        'Selecionar...',
        'AC - Acre',
        'AL - Alagoas',
        'AP - Amapá',
        'AM - Amazonas',
        'BA - Bahia',
        'CE - Ceará',
        'DF - Distrito Federal',
        'ES - Espírito Santo',
        'GO - Goías',
        'MA - Maranhão',
        'MT - Mato Grosso',
        'MS - Mato Grosso do Sul',
        'MG - Minas Gerais',
        'PA - Pará',
        'PB - Paraíba',
        'PR - Paraná',
        'PE - Pernambuco',
        'PI - Piauí',
        'RJ - Rio de Janeiro',
        'RN - Rio Grande do Norte',
        'RS - Rio Grande do Sul',
        'RO - Rondônia',
        'RR - Roraíma',
        'SC - Santa Catarina',
        'SP - São Paulo',
        'SE - Sergipe',
        'TO - Tocantins'
    ];

    window.onload = () => {

        writeForm();
        activateInputMask();

    };

    const activateInputMask = () => {

        setTimeout(() => Inputmask().mask(document.querySelectorAll("input")), 100);

    };

    const ageIsMoreThan18 = (dateOfBirth) => {

        const age = Math.floor((new Date().getTime() - new Date(dateOfBirth).getTime()) / (365 * 24 * 60 * 60 * 1000));
        return (age >= 18 && age.toString().length <= 2);

    };

    const checkStateAndDriverLicense = () => {

        const selectedState = document.querySelector('#input_state').value || '';
        const firstNumDriverLicense = document.querySelector('#input_driver_license').value[0] || '';

        return ((selectedState === 'RN - Rio Grande do Norte') && (firstNumDriverLicense === '6'));

    }

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

            let inputs_str = '';
            for (let i = 0; i < multiply; i++) {

                const isNotTheFirst = (i > 0);

                inputs_str += `<div class="input_group" style="display: ${i > 0 ? 'none' : 'block'}" id="group_${id[0] + ((isNotTheFirst) ? i : '')}">

                    ${(id[0] === 'state') ? `

                        <select id="input_${id[0] + ((isNotTheFirst) ? i : '')}">
                            ${brazil_states.map(state => `<option value="${state}">${state}</option>`)}
                        </select>` :

                        `<input 
                            id="input_${id[0] + ((isNotTheFirst) ? i : '')}" 
                            type="${type[0]}" 
                            ${required[0] && 'required'}
                            data-inputmask="${dataInputmask[0]}"
                            style="width:${(!id[1] && !addNew) ? '100%' : 'auto'}"
                        />
                            
                    `}

                    ${id[1] ? `

                        <input 
                            id="${id[1]}" 
                            type="${type[1]}" 
                            ${required[1] && 'required'}
                            data-inputmask="${dataInputmask[1]}"
                            style="width:${(!id[1] && !addNew) ? '100%' : 'auto'}"
                        /> 

                        ${title[1] ? `
                            
                            <label for="${id[1]}">
                                ${title[1]}
                            </label>
                        
                        `: ''} 
                        
                    ` : ''}

                    ${deleteButton ? `

                        <div class="extra_button removeInput">
                            | Excluir
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
                                <u class="extra_button addButton" id="add">
                                    Adicionar Novo
                                </u>
                            </div>
                        ` : ''}

                </div>

            </div>`;


            setTimeout(() => {

                document.querySelectorAll('.removeInput').forEach(element => {

                    element.onclick = (e) => {

                        const parent = e.target.parentNode;

                        parent.style.display = 'none';

                        console.log(parent);

                        document.querySelector('.addButton').style.display = 'block';

                        // / / / / / TODO: MELHORAR O SISTEMA DE ADICIONAR E EXCLUIR OS NOVOS INPUTS

                    }

                });

                document.querySelectorAll('.addButton').forEach(element => {

                    element.onclick = (e) => {

                        const parent = e.target.parentNode.parentNode;
                        const dataName = parent.id.split('_')[1];

                        inputConfig.counter[dataName] += 1;

                        const element = document.querySelector(`#group_${dataName}${inputConfig.counter[dataName]}`);
                        const nextElement = document.querySelector(`#group_${dataName}${inputConfig.counter[dataName] + 1}`);

                        element.style.display = 'block';
                        if (!nextElement) e.target.style.display = 'none';

                    }

                });

            }, 100);


            element.onkeyup = element.onchange = (event) => onChangeHandle(event);

        });


    }


    onChangeHandle = function (event) {

        const id = event.target.id;

        switch (id) {

            case "input_birthday":

                if (event.target.value.length === 10) {

                    document.querySelector(`#container_driver_license`).style.display = ageIsMoreThan18(event.target.value) ? 'block' : 'none';

                    document.querySelector(`#container_responsible_name`).style.display = !ageIsMoreThan18(event.target.value) ? 'block' : 'none';
                    document.querySelector(`#container_responsible_phone`).style.display = !ageIsMoreThan18(event.target.value) ? 'block' : 'none';

                }

                break;

            case "input_state":
            case "input_driver_license":

                document.querySelector(`#container_city`).style.display = checkStateAndDriverLicense() ? 'block' : 'none';

                break;

            default: break;

        }

    }

})();

