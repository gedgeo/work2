$(document).ready(initApp);

function initApp() {
    loadUserTable();
    initAddClasse();      // Ajout classe
    initAddUtilisateur(); // Ajout utilisateur
    loadClassesForSelect(); // Charger les classes dans le select utilisateur
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
                console.log(response); // Voir la réponse dans la console
                if (response.success) {
                    alert('Classe ajoutée avec succès.');
                    $('#addClasseModal').modal('hide');
                    $('#classeAdd').val('');
                    loadClassesForSelect(); // Recharge la liste des classes pour le select
                } else {
                    alert("Erreur lors de l'ajout de la classe : " + (response.message || 'Inconnue.'));
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                showAjaxError(jqXHR, textStatus, errorThrown);
            }
        });
    });
}

function initAddUtilisateur() {
    $('#ajoutUtilisateur').on('click', function(e) {
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
            data: { nom: nom, prenom: prenom, id_classes: id_classes },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    alert('Utilisateur ajouté avec succès.');
                    $('#addUserModal').modal('hide');
                    $('#addUserForm')[0].reset();
                    loadUserTable(); // Recharge la table des utilisateurs
                } else {
                    alert('Erreur lors de l\'ajout de l\'utilisateur : ' + (response.message || 'Inconnue.'));
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                showAjaxError(jqXHR, textStatus, errorThrown);
            }
        });
    });
}

function loadClassesForSelect() {
    $.ajax({
        url: '../Controleurs/controleur_utilisateur.php',
        method: 'GET',
        data: { action: 'getClasses' },
        dataType: 'json',
        success: function(classes) {
            const $select = $('#classeSelect');
            $select.empty();
            $select.append('<option value="">-- Sélectionnez une classe --</option>');
            classes.forEach(classe => {
                $select.append(`<option value="${classe.id_classes}">${escapeHtml(classe.nom_classe)}</option>`);
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Erreur lors du chargement des classes :', errorThrown);
        }
    });
}

function loadUserTable() {
    $.ajax({
        url: '../Controleurs/controleur_utilisateur.php',
        method: 'GET',
        data: { action: 'getUsers' },
        dataType: 'json',
        success: function (donnees) {
            renderUserTable(donnees);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            showAjaxError(jqXHR, textStatus, errorThrown);
        }
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
                    <a href="modifier.php?id=${user.id_utilisateur}" class="btn btn-warning">Modifier</a>
                    <a href="supp.php?id=${user.id_utilisateur}" class="btn btn-danger">Supprimer</a>
                </td>
            </tr>
        `);
        $tbody.append($row);
    });
}

function showAjaxError(xhr, status, error) {
    const $tbody = $('#user-table tbody');
    $tbody.html(`<tr><td colspan="5" class='text-danger text-center'>Erreur AJAX : ${error}</td></tr>`);
}

function escapeHtml(str) {
    return $('<div>').text(str).html();
}
