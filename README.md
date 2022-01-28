# Microservices Architecture

## This architecture consists of three microservices:

1. content Service
2. user Service
3. user interaction Service

## The content service is responsible for managing the content.

A content comprises of:

1. Title
2. Story
3. Author
4. Publication Date

## The user service is responsible for managing the user.

A user has following properties:

1. username
2. password
3. First Name
4. Last Name
5. Email
6. ISD Code
7. Phone Number

## The user interaction service is responsible for managing the user interaction.

A user interaction can either be reading a content or liking a content.
An interaction has been stored in the following manner:

- Read Model

  - - User ID
  - - Liked content IDs
  - - Read content IDs

- Like Model
- - Content ID
- - Users who liked the content

- Read Model
- - Content ID
- - Users who read the content
