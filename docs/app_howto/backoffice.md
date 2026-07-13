---
sidebar_position: 8
---

# Backoffice

If you are administrating your own Tenzu instance, you'll be able to access a backoffice 
(or a django-admin for those that are familiar with that term).

## Connect

To connect to the backoffice, go to https://\<your_instance_domain>/admin/

You'll need an account with administrator privileges. 
For that, use the command `manage.py createsuperuser` (see [django docs](https://docs.djangoproject.com/en/6.0/ref/django-admin/#createsuperuser)).

:::danger
**Don't** create a superuser using an email you want to use as a normal Tenzu user.
The permission checks used by the API is not meant to be used with a superuser and **will cause errors**.
:::

## Users

You can check the list containing all the users that have registered on your Tenzu instance.

This view is read-only, you cannot modify any user from there.

## Feed items

Here, you can create new items that will be displayed in every user's news feed.
Here you can create 3 different types of feed item:
- **Maintenance**: to alert users to planned maintenance that will interrupt the service;
- **Release**: to provides an explanation about a new version of the application;
- **Call-to-action**: An action you want the user to take (e.g. filling in a survey).

This allows you to communicate with the user base of the Tenzu instance you are administering as needed.
This is how the Tenzu team will deliver news to their users on the [official SaaS](https://tenzu.app).

Release feed items are special because they are written by the Tenzu team and delivered directly to you 
with each new significant version of Tenzu that is deployed. They are created via a data migration 
so that admins do not need to create them manually.

New feed items will be displayed in a modal on user connection, and afterwards they will be available 
back in the "News" section of the user menu.