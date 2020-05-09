var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLInputObjectType = require("graphql").GraphQLInputObjectType;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var GraphQLDate = require("graphql-date");
var LogoModel = require("../models/Logo");

const TextType = new GraphQLObjectType({
  name: "Text",
  description: "This represents a text field: Text, Color and Size",
  fields: () => ({
    text: { type: GraphQLString },
    color: { type: GraphQLString },
    size: { type: GraphQLInt },
    x: { type: GraphQLInt },
    y: { type: GraphQLInt },
    id: { type: GraphQLString },
  }),
});

const TextTypeInput = new GraphQLInputObjectType({
  name: "TextInput",
  description: "This represents a text field: Text, Color and Size",
  fields: () => ({
    text: { type: GraphQLNonNull(GraphQLString) },
    color: { type: GraphQLNonNull(GraphQLString) },
    size: { type: GraphQLNonNull(GraphQLInt) },
    x: { type: GraphQLInt },
    y: { type: GraphQLInt },
  }),
});

const logoType = new GraphQLObjectType({
  name: "logo",
  description: "a Logo",
  fields: () => ({
    _id: {
      type: GraphQLString,
    },

    text: {
      type: GraphQLList(GraphQLNonNull(TextType)),
      // resolve: (parent) => {
      //   return texts.filter((text) => text.id === parent._id);
      // },
    },

    backgroundColor: {
      type: GraphQLString,
    },
    borderColor: {
      type: GraphQLString,
    },
    borderRadius: {
      type: GraphQLInt,
    },
    borderWidth: {
      type: GraphQLInt,
    },
    padding: {
      type: GraphQLInt,
    },
    margins: {
      type: GraphQLInt,
    },
    width: {
      type: GraphQLInt,
    },
    height: {
      type: GraphQLInt,
    },
    lastUpdate: {
      type: GraphQLDate,
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "root Query",
  fields: () => ({
    logos: {
      type: new GraphQLList(logoType),
      description: "List of logos",
      resolve: () => {
        const logos = LogoModel.find().sort({ lastUpdate: -1 }).exec();
        if (!logos) {
          throw new Error("Error");
        }
        return logos;
      },
    },

    logo: {
      type: logoType,
      description: "Find a logo",
      args: {
        _id: { type: GraphQLString },
      },
      resolve: function (root, params) {
        const logoDetails = LogoModel.findById(params._id).exec();
        if (!logoDetails) {
          throw new Error("Error");
        }
        return logoDetails;
      },
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "root Mutation",
  fields: () => ({
    addLogo: {
      type: logoType,
      description: "add a logo",
      args: {
        text: { type: GraphQLList(GraphQLNonNull(TextTypeInput)) },
        backgroundColor: { type: GraphQLNonNull(GraphQLString) },
        borderColor: { type: GraphQLNonNull(GraphQLString) },
        borderRadius: { type: GraphQLNonNull(GraphQLInt) },
        borderWidth: { type: GraphQLNonNull(GraphQLInt) },
        padding: { type: GraphQLNonNull(GraphQLInt) },
        margins: { type: GraphQLNonNull(GraphQLInt) },
        width: { type: GraphQLNonNull(GraphQLInt) },
        height: { type: GraphQLNonNull(GraphQLInt) },
      },

      resolve: function (root, params) {
        const test = {
          ...params,
          text: JSON.parse(JSON.stringify(params.text)),
        };
        console.log("logo", test);
        const logoModel = new LogoModel(test);
        const newLogo = logoModel.save();
        if (!newLogo) {
          throw new Error("Error");
        }
        console.log(newLogo);
        return newLogo;
      },
    },

    updateLogo: {
      type: logoType,
      description: "update a logo in the db",
      args: {
        _id: { type: GraphQLString },
        text: { type: GraphQLList(GraphQLNonNull(TextTypeInput)) },
        backgroundColor: { type: GraphQLNonNull(GraphQLString) },
        borderColor: { type: GraphQLNonNull(GraphQLString) },
        borderRadius: { type: GraphQLNonNull(GraphQLInt) },
        borderWidth: { type: GraphQLNonNull(GraphQLInt) },
        padding: { type: GraphQLNonNull(GraphQLInt) },
        margins: { type: GraphQLNonNull(GraphQLInt) },
        width: { type: GraphQLNonNull(GraphQLInt) },
        height: { type: GraphQLNonNull(GraphQLInt) },
      },

      resolve(root, params) {
        return LogoModel.findByIdAndUpdate(
          params._id,
          {
            text: params.text,
            backgroundColor: params.backgroundColor,
            borderColor: params.borderColor,
            borderRadius: params.borderRadius,
            borderWidth: params.borderWidth,
            padding: params.padding,
            margins: params.margins,
            width: params.width,
            height: params.height,
            lastUpdate: new Date(),
          },
          function (err) {
            if (err) return next(err);
          }
        );
      },
    },

    removeLogo: {
      type: logoType,
      description: "Remove a logo",
      args: {
        _id: { type: GraphQLNonNull(GraphQLString) },
      },
      // resolve: (_, args) => {
      //   var logo = logos.find((logo) => args._id === logos._id);
      //   return logo;
      // },
      resolve(root, params) {
        const remLogo = LogoModel.findByIdAndRemove(params._id).exec();
        if (!remLogo) {
          throw new Error("Error");
        }
        console.log(remLogo);
        return remLogo;
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
