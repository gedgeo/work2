$(document).ready(initApp);

function initApp() {
    loadUserTable();
    initAddClasse();
    initAddUtilisateur();
    loadClassesForSelect();
    initEditUtilisateur(); // Nouvelle fonction
}

function initAddClasse() {
    $('#ajout').on('click', function (e) {
        e.preventDefault();

        const classe = $('#classeAdd').val().trim();
        if (classe === '') {
            alert('Veuillez saisir une classe.');
            return;
        }

        $.ajax({
            url: '../Controleurs/controleur_utilisateur.php?action=ajouterClasse',
            method: 'POST',
            data: { classe: classe },
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    alert('Classe ajoutée avec succès.');
                    $('#addClasseModal').modal('hide');
                    $('#classeAdd').val('');
                    loadClassesForSelect();
                } else {
                    alert("Erreur : " + (response.message || 'Inconnue.'));
                }
            },
            error: showAjaxError
        });
    });
}

function initAddUtilisateur() {
    $('#ajoutUtilisateur').on('click', function (e) {
        e.preventDefault();

        const nom = $('#nomAdd').val().trim();
        const prenom = $('#prenomAdd').val().trim();
        const id_classes = $('#classeSelect').val();

        if (nom === '' || prenom === '' || !id_classes) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        $.ajax({
            url: '../Controleurs/controleur_utilisateur.php?action=ajouterUtilisateur',
            method: 'POST',
            data: { nom, prenom, id_classes },
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    alert('Utilisateur ajouté avec succès.');
                    $('#addUserModal').modal('hide');
                    $('#addUserForm')[0].reset();
                    loadUserTable();
                } else {
                    alert("Erreur : " + (response.message || 'Inconnue.'));
                }
            },
            error: showAjaxError
        });
    });
}

function loadClassesForSelect() {
    $.ajax({
        url: '../Controleurs/controleur_utilisateur.php',
        method: 'GET',
        data: { action: 'getClasses' },
        dataType: 'json',
        success: function (classes) {
            const $select = $('#classeSelect');
            $select.empty();
            $select.append('<option value="">-- Sélectionnez une classe --</option>');
            classes.forEach(classe => {
                $select.append(`<option value="${classe.id_classes}">${escapeHtml(classe.nom_classe)}</option>`);
            });
        },
        error: function (xhr, status, error) {
            console.error('Erreur chargement classes :', error);
        }
    });
}

function loadUserTable() {
    $.ajax({
        url: '../Controleurs/controleur_utilisateur.php',
        method: 'GET',
        data: { action: 'getUsers' },
        dataType: 'json',
        success: renderUserTable,
        error: showAjaxError
    });
}

function renderUserTable(users) {
    const $tbody = $('#user-table tbody');
    $tbody.empty();

    if (!Array.isArray(users) || users.length === 0) {
        $tbody.append("<tr><td colspan='5' class='text-center'>Aucun utilisateur trouvé.</td></tr>");
        return;
    }

    users.forEach(user => {
        const $row = $(`
            <tr>
                <td>${user.id_utilisateur}</td>
                <td>${escapeHtml(user.nom)}</td>
                <td>${escapeHtml(user.prenom)}</td>
                <td>${escapeHtml(user.nom_classe || 'Non assignée')}</td>
                <td>
                    <button class="btn btn-warning btn-modifier" data-id="${user.id_utilisateur}" data-nom="${escapeHtml(user.nom)}" data-prenom="${escapeHtml(user.prenom)}" data-id_classe="${user.id_classes || ''}">Modifier</button>
                    <button class="btn btn-danger btn-supprimer" data-id="${user.id_utilisateur}">Supprimer</button>
                </td>
            </tr>
        `);
        $tbody.append($row);
    });

    // Événements
    $('.btn-supprimer').on('click', handleDeleteUser);
    $('.btn-modifier').on('click', initEditUtilisateurClick);
}

// Variable globale pour id à supprimer
let userIdToDelete = null;

function handleDeleteUser() {
    userIdToDelete = $(this).data('id');
    $('#deleteConfirmModal').modal('show');
}

$('#confirmDeleteBtn').on('click', function () {
    if (!userIdToDelete) return;

    $.ajax({
        url: '../Controleurs/controleur_utilisateur.php',
        method: 'GET',
        data: { action: 'deleteUser', id: userIdToDelete },
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                $('#deleteConfirmModal').modal('hide');
                alert('Utilisateur supprimé avec succès.');
                loadUserTable();
            } else {
                alert('Erreur lors de la suppression : ' + (response.message || 'Inconnue.'));
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            showAjaxError(jqXHR, textStatus, errorThrown);
        }
    });

    userIdToDelete = null;
});

function initEditUtilisateurClick() {
    const id = $(this).data('id');
    const nom = $(this).data('nom');
    const prenom = $(this).data('prenom');
    const idClasse = $(this).data('id_classe');

    $('#editUserId').val(id);
    $('#editNom').val(nom);
    $('#editPrenom').val(prenom);

    loadClassesForEdit(idClasse);
    $('#editUserModal').modal('show');
}

function initEditUtilisateur() {
    // Soumission modification
    $('#modifierUtilisateur').on('click', function (e) {
        e.preventDefault();

        const id = $('#editUserId').val();
        const nom = $('#editNom').val().trim();
        const prenom = $('#editPrenom').val().trim();
        const id_classes = $('#editClasse').val();

        if (nom === '' || prenom === '' || !id_classes) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        $.ajax({
            url: '../Controleurs/controleur_utilisateur.php?action=modifierUtilisateur',
            method: 'POST',
            data: { id_utilisateur: id, nom, prenom, id_classes },
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    alert('Utilisateur modifié avec succès.');
                    $('#editUserModal').modal('hide');
                    loadUserTable();
                } else {
                    alert("Erreur : " + (response.message || 'Inconnue.'));
                }
            },
            error: showAjaxError
        });
    });
}

function loadClassesForEdit(selectedId) {
    $.ajax({
        url: '../Controleurs/controleur_utilisateur.php',
        method: 'GET',
        data: { action: 'getClasses' },
        dataType: 'json',
        success: function (classes) {
            const $select = $('#editClasse');
            $select.empty();
            $select.append('<option value="">-- Sélectionnez une classe --</option>');
            classes.forEach(classe => {
                const selected = classe.id_classes == selectedId ? 'selected' : '';
                $select.append(`<option value="${classe.id_classes}" ${selected}>${escapeHtml(classe.nom_classe)}</option>`);
            });
        },
        error: function (xhr, status, error) {
            console.error('Erreur chargement classes (edit) :', error);
        }
    });
}

function escapeHtml(str) {
    return $('<div>').text(str).html();
}

function showAjaxError(xhr, status, error) {
    console.error("Erreur AJAX :", error);
    $('#user-table tbody').html(`<tr><td colspan="5" class='text-danger text-center'>Erreur AJAX : ${error}</td></tr>`);
}
