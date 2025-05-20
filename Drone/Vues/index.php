<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <title>Liste des Utilisateurs</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Bootstrap 5 CSS & JS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"></script>

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />

    <style>
        .mod {
            color: blue;
            cursor: pointer;
        }
        .supp {
            color: red;
            cursor: pointer;
        }
    </style>
</head>
<body>
<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" href="accueil.php">Accueil</a></li>
        <li class="nav-item"><a class="nav-link" href="historique.php">Historique</a></li>
        <li class="nav-item"><a class="nav-link" href="stat.php">Statistiques</a></li>
        <li class="nav-item"><a class="nav-link" href="ajouter.php">Ajout élève</a></li>
        <li class="nav-item"><a class="nav-link" href="connection.php">Connexion</a></li>
    </ul>
</nav>

<div class="container my-4">
    <header class="d-flex justify-content-between my-4">
        <h1>Liste des Utilisateurs</h1>
        <div>
            <button class="btn btn-primary me-2" id="btnAddUser" data-bs-toggle="modal" data-bs-target="#addUserModal">
                Ajouter un Utilisateur
            </button>
            <button class="btn btn-primary" id="btnAddClasse" data-bs-toggle="modal" data-bs-target="#addClasseModal">
                Ajouter une classe
            </button>
        </div>
    </header>

    <table id="user-table" class="table table-striped table-bordered text-center">
    <thead class="table-dark">
        <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Classe</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <!-- Contenu chargé dynamiquement via AJAX -->
    </tbody>
</table>
</div>

<!-- Modal Ajouter une classe -->
<div class="modal fade" id="addClasseModal" tabindex="-1" aria-labelledby="addClasseModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addClasseModalLabel">Ajouter une classe</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
            </div>
            <div class="modal-body">
                <form id="addClasseForm" action="#">
                    <div class="mb-3">
                        <label for="classeAdd" class="form-label">Classe</label>
                        <input type="text" class="form-control" id="classeAdd" required />
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button class="btn btn-primary" id="ajout">Ajouter</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Ajouter un utilisateur -->
<div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addUserModalLabel">Ajouter un utilisateur</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
      </div>
      <div class="modal-body">
        <form id="addUserForm" action="#">
          <div class="mb-3">
            <label for="nomAdd" class="form-label">Nom</label>
            <input type="text" class="form-control" id="nomAdd" required />
          </div>
          <div class="mb-3">
            <label for="prenomAdd" class="form-label">Prénom</label>
            <input type="text" class="form-control" id="prenomAdd" required />
          </div>
          <div class="mb-3">
            <label for="classeSelect" class="form-label">Classe</label>
            <select id="classeSelect" class="form-select" required>
              <option value="">-- Sélectionnez une classe --</option>
              <!-- Options de classes à charger dynamiquement via JS -->
            </select>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
        <button class="btn btn-primary" id="ajoutUtilisateur">Ajouter</button>
      </div>
    </div>
  </div>
</div>


<!-- Script -->
<script src="main.js"></script>
</body>
</html>
