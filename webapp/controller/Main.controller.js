sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
  ],
  function (Controller, JSONModel, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("com.esegura.pe.demo.controller.Main", {
      
      onInit: function () {
        this.listProducts();
      },  

      listProducts: function () {
        const oService = this.getOwnerComponent().getModel("oDataService");
        const oModel = new JSONModel();
        const uri = "/Products";

        const panelProducts = this.getView().byId("panelProducts");

        oService.read(uri, {
          success: function (oData, oResponse) {
            console.log("oData", oData);
            oModel.setData(oData.results);

            panelProducts.setHeaderText(
              `Products (${oData.results.length})`
            );
          },
          error: function (oError) {
            console.log("oError", oError);
          },
        });

        this.getView().setModel(oModel, "oDataProducts");
      },

    });
  }
);