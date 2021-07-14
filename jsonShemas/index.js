

const userJsonSchema = {
    type: "object",
    properties: {
        login: {type: "string",
                "minLength": 3,
                "pattern": "^[a-zA-Z0-9 ]+$"},

        password: {type: "string",
                    "minLength": 8,}
    },
    required: ["login", "password"],
    additionalProperties: false,
}

module.exports = userJsonSchema;
