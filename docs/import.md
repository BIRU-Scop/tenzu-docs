---
sidebar_position: 6
---

# Importation

## Importation from Taiga

You'll first need a project dump from your Taiga instance. For that, head to the [related Taiga documentation](https://community.taiga.io/t/import-export-taiga-projects/168).

Then, open the project creation modal in Tenzu like you would usually do and select the "Import project from Taiga" button to select the project dump that you recovered.
You'll be able to see in real time the progress of your importation as well as be alerted if your importation succeeded or failed.

### Migrated data

:::info
Support for missing features will be added gradually.
This will be done transparently for you, so you won't have to import your project more than once.
**Any newly supported data will be imported automatically from preexisting importations**.
:::

For now, Taiga importation will migrate the following:
- Project properties like name, logo, etc
- Project roles
- KANBAN statuses and swimlanes
  - Swimlanes will be converted to separate KANBANs
- Stories taken from the KANBAN
  - Attachments
  - Comments
  - Assignments will be created only for the current user; other users present in the Taiga export 
    are not supported yet and will not be added to the Tenzu project (coming soon).
    Users will be matched based on their email addresses

:::warning
Please note that the user that launches the importation will become Owner of the project in Tenzu,
no matter what role they originally had in Taiga.
:::

<hr/>

:::danger
Taiga importation is still experimental
If you encounter a problem while importing a project dump from Taiga, 
please help us by reaching out with the problematic file and your context information!
:::