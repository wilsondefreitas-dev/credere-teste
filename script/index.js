(() => {

    let formData = {};

    window.onload = () => {

        writeForm();
        addEventsOnAddAndRemoveInputButtons();
        activateInputMask();

    };

    const activateInputMask = () => {

        setTimeout(() => Inputmask().mask(document.querySelectorAll("input")), 100);

    };

    const onChangeHandle = (event) => {

        const id = event.target.id;

        switch (id) {

            case "input_birthday":

                const dateIsComplete = (event.target.value.length === 10);

                if (dateIsComplete) {

                    const license = document.querySelector("#container_driver_license");
                    const responsible_name = document.querySelector("#container_responsible_name");
                    const responsible_phone = document.querySelector("#container_responsible_phone");

                    console.log(license);

                    license.style.display = ageIsMoreThan18(event.target.value) ? 'block' : 'none';

                    responsible_name.style.display = !ageIsMoreThan18(event.target.value) ? 'block' : 'none';
                    responsible_phone.style.display = !ageIsMoreThan18(event.target.value) ? 'block' : 'none';

                }

                break;

            case "input_state":
            case "input_driver_license":

                const city = document.querySelector(`#container_city`);
                city.style.display = checkStateAndDriverLicense() ? 'block' : 'none';

                break;

            default: break;

        }

        setValue();

    }

    const ageIsMoreThan18 = (dateOfBirth) => {

        const age = Math.floor((new Date().getTime() - new Date(dateOfBirth).getTime()) / (365 * 24 * 60 * 60 * 1000));
        return (age >= 18 && age.toString().length <= 2);

    };

    const checkStateAndDriverLicense = () => {

        const selectedState = document.querySelector('#input_state').value || '';
        const firstNumDriverLicense = document.querySelector('#input_driver_license').value[0] || '';

        return ((selectedState === 'RN - Rio Grande do Norte') && (firstNumDriverLicense === '6'));

    }

    const addInput = (e) => {

        const parent = e.target.parentNode.parentNode;
        const dataName = parent.id.split('_')[1];

        Array.from(document.querySelectorAll(`.${dataName}`)).some(input => {

            if (input.style.display === 'none') {

                input.style.display = 'block';
                return true;

            }

        });

        const isAllBlock = function () {

            let buttonElements = Array.from(document.querySelectorAll(`.${dataName}`));
            return buttonElements.every(input => !(input.style.display === 'none'));

        }

        if (isAllBlock()) e.target.style.display = 'none';

    }

    const removeInput = (e) => {

        const parent = e.target.parentNode;
        const dataName = e.target.id.split('_')[1];

        if (dataName === "phone") {

            const radioElement = parent.getElementsByClassName('radio_main')[0];
            const firstRadio = document.querySelector('#main');

            if (radioElement.checked) {

                radioElement.checked = false;
                firstRadio.checked = true;

            }

        }

        parent.style.display = 'none';
        document.getElementsByClassName(`addButton ${dataName}`)[0].style.display = 'block';

    }

    const addEventsOnAddAndRemoveInputButtons = () => {

        const removeInputButtons = document.querySelectorAll('.removeInput');
        const addInputButtons = document.querySelectorAll('.addButton');

        removeInputButtons.forEach(button => button.onclick = removeInput);
        addInputButtons.forEach(button => button.onclick = addInput);

    }

    const setValue = () => {

        var elements = document.getElementById("form").elements;
        var obj = {};

        for (let i = 0; i < elements.length; i++) {

            const item = elements.item(i);
            const isRadio = (item.getAttribute('type') === 'radio');

            obj[item.id] = isRadio ? item.checked : item.value;

        }

        formData = JSON.stringify(obj);

    }

    const submitData = () => {

        try {

            console.log(JSON.parse(formData));

        } catch {

            throw new Error('Nenhum dado inserido');

        }

    }

    const writeForm = () => {

        document.querySelectorAll(".custon_input").forEach(element => {

            const getAttr = (attr) => element.getAttribute(attr);

            const label = getAttr("label");

            const id = [getAttr("id"), getAttr("id2")],
                type = [getAttr("type"), getAttr("type2")],
                title = [getAttr("title2"), getAttr("title2")],
                required = [(getAttr("required") === "true"), (getAttr("required2") === "true")],
                dataInputmask = [(getAttr("data-inputmask") || ""), (getAttr("data-inputmask2") || "")],
                options = [getAttr("options")?.split(","), getAttr("options2")?.split(",")];

            const addNew = (getAttr("addNew") === "true"),
                deleteButton = (getAttr("deleteButtton") === "true"),
                hide = (getAttr("hide") === "true");

            const multiply = parseInt(getAttr("multiply")) || 1;

            element.classList.add = "input_container";

            let inputs_str = '';
            for (let i = 0; i < multiply; i++) {

                const isNotTheFirst = (i > 0);

                inputs_str += `<div class="input_group ${id[0]}" style="display: ${i > 0 ? 'none' : 'block'}">

                    ${(type[0] === 'select') ? `

                        <select 
                            ${required[0] && 'required'} 
                            id="input_${id[0] + ((isNotTheFirst) ? i : '')}">

                            ${options[0].map(state => `<option value="${state}">${state}</option>`)}

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
                            id="${id[1] + ((isNotTheFirst) ? i : '')}" 
                            name="radio_${id[1]}"
                            type="${type[1]}" 
                            ${required[1] && 'required'}
                            data-inputmask="${dataInputmask[1]}"
                            style="width:${(!id[1] && !addNew) ? '100%' : 'auto'}"
                            class="radio_main"
                            ${(!isNotTheFirst) && 'checked'}
                        /> 

                        ${title[1] ? `
                            
                            <label for="${id[1] + ((isNotTheFirst) ? i : '')}" class="${id[1] + ((isNotTheFirst) ? i : '')}">
                                ${title[1]}
                            </label>
                        
                        `: ''} 
                        
                    ` : ''}

                    ${(deleteButton && isNotTheFirst) ? `

                        <div id="remove_${id[0]}" class="extra_button removeInput">
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
                            <u class="extra_button addButton ${id[0]}" id="add">
                                Adicionar Novo
                            </u >
                        </div >
                ` : ''}

            </div>`;

            element.onkeyup = element.onchange = (event) => onChangeHandle(event);

            document.querySelector('#submitButton').onclick = submitData;

        });

    }

})();