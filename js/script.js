'use strict';
document.addEventListener('DOMContentLoaded', () => {

    if (typeof (Storage) != undefined) {

        const tasks = JSON.parse(localStorage.getItem("tareas")) || [];

        const newTask = document.querySelector("#btn-crear-nueva-tarea")
        newTask.addEventListener('click', () => {
            createTask();
        })

        function validarCampos(campoA, campoB) {
            let hayError = false;
            if (campoA === "") {
                hayError = true;
            }
            if (campoB === "") {
                hayError = true;
            }
            return !hayError;
        };

        function createTask() {
            const taskName = document.querySelector('#input-task-name').value;
            const deadline = document.querySelector('#input-deadline').value;
            const creationDate = new Date();
            let formatDate = creationDate.toLocaleDateString('es-ES');
            if (validarCampos(taskName, deadline)) {
                tasks.push({ id: Date.now(), taskName: taskName, creationDate: formatDate, expirationDate: deadline, status: "Pendiente" })
                localStorage.setItem("tareas", JSON.stringify(tasks));
                console.log(JSON.parse(localStorage.getItem("tareas")));

                const form = document.querySelector('#task-form');
                form.style.display = 'none';

                const notificacion = document.querySelector('#tarea-guardada-notificacion');
                notificacion.style.display = 'block';

                setTimeout(() => {
                    location.reload();
                }, 2000)

                buttonDisplayNone('#btn-crear-nueva-tarea');
                buttonDisplayNone('#btn-cancelar');
            } else {
                const alert = document.querySelector('.alert-danger');
                const button = document.querySelector('#btn-crear-nueva-tarea');
                alert.style.display = 'block';
                ocultarAlert(alert);
                buttonDisabled(button)
            };
        };

        function buttonDisabled(button) {
            button.disabled = true;
            setTimeout(() => {
                button.disabled = false;
            }, 2000);
        }

        function buttonDisplayNone(button) {
            button = document.querySelector(button);
            button.style.display = 'none';
        };

        function ocultarAlert(objeto) {
            setTimeout(() => {
                objeto.style.display = 'none';
            }, 2000)
        }

        const task = JSON.parse(localStorage.getItem('tareas')) || [];
        const taskList = document.querySelector('#listTask');
        if (taskList) {
            getTask();
        };

        function getTask() {
            task.forEach(task => {
                let tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${task.id}</td>
                    <td>${task.taskName}</td>
                    <td>${task.creationDate}</td>
                    <td>${task.expirationDate}</td>
                    <td>${task.status}</td>
                    <td>
                        <button type="button" class="btn btn-danger btn-borrar" data-id=${task.id}>Borrar</button>
                        <button type="button" class="btn btn-secondary btn-editar" data-id=${task.id}>Editar</img></button>
                        <button type="button" class="btn btn-success btn-completar" data-id=${task.id}>Completar</button>
                    </td>`;
                taskList.appendChild(tr);
            });
        }

        function editTask(id) {
            alert("Funcionalidad en desarrollo");
        }; // proximamente

        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('btn-editar')) {
                const id = e.target.dataset.id;
                editTask(id);
            }
        });

        function deleteTask(id) {
            let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
            tareas = tareas.filter(t => t.id != id);
            localStorage.setItem('tareas', JSON.stringify(tareas));
            location.reload();
        };

        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('btn-borrar')) {
                const id = e.target.dataset.id;
                deleteTask(id);
            }
        });


        function completeTask(id) {
            const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
            const index = tareas.findIndex(t => t.id == id);
            if (index !== -1) {
                tareas[index].status = "Completada";
                localStorage.setItem('tareas', JSON.stringify(tareas));
                location.reload();
            }
        };

        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('btn-completar')) {
                const id = e.target.dataset.id;
                completeTask(id);
            };
        });

    } else {
        console.log("localStorage NO SOPORTADO");
    }
});