/* global P */

/**
 * 
 * @author mg
 * {global P}
 */
function ToExcel() {
    var self = this
            , model = P.loadModel(this.constructor.name)
            , form = P.loadForm(this.constructor.name, model);

    self.show = function () {
        form.show();
    };

    var widget = new P.AnchorsPane();
    widget.width = 500;
    widget.height = 200;

    var grdExport = new P.ModelGrid();
    grdExport.editable = grdExport.deletable = grdExport.insertable = false;

    var colService = new P.ServiceGridColumn();
    var colName = new P.ModelGridColumn();
    colName.title = "Pet's name";
    colName.minWidth = 107;
    colName.field = 'pet';
    colName.editor = new P.ModelCombo();
    colName.editor.displayField = 'name';
    var colFromDate = new P.ModelGridColumn();
    colFromDate.title = 'From date';
    colFromDate.minWidth = 107;
    colFromDate.field = 'fromdate';
    colFromDate.editor = new P.ModelDate();
    colFromDate.editor.format = 'dd.MM.yyyy';
    var colToDate = new P.ModelGridColumn();
    colToDate.title = 'To date';
    colToDate.minWidth = 107;
    colToDate.field = 'todate';
    colToDate.editor = new P.ModelDate();
    colToDate.editor.format = 'dd.MM.yyyy';
    var colIsPaid = new P.ModelGridColumn();
    colIsPaid.title = 'Paid';
    colIsPaid.minWidth = 65;
    colIsPaid.field = 'ispaid';
    colIsPaid.editor = new P.ModelCheckBox();

    grdExport.addColumnNode(colService);
    grdExport.addColumnNode(colName);
    grdExport.addColumnNode(colFromDate);
    grdExport.addColumnNode(colToDate);
    grdExport.addColumnNode(colIsPaid);

    var btnReport = new P.Button('Export...');
    btnReport.onActionPerformed = function (evt) {
        btnReport.enabled = false;
        P.requireRemotes('ToExcelExport', function (toExcelExport) {
            toExcelExport.execute(function (aReport) {
                aReport.show();
                btnReport.enabled = true;
            }, function () {
                btnReport.enabled = true;
            });
        }, function () {
            btnReport.enabled = true;
        });
    };

    widget.add(btnReport, {left: 0, width: 100, top: 0, height: 30});
    widget.add(grdExport, {left: 0, width: 500, top: 40, height: 160});

    self.showOnPanel = function (aPanel) {
        aPanel.add(form.view);
        model.requery(function () {
            grdExport.data = model.qAllVisits;
        });
    };

    self.getDemoComponent = function () {
        return widget;
    };

    self.getViewComponent = function () {
        return widget;
    };

    self.getFormHeight = function () {
        return form.view.height;
    };
    // TODO : place your code here

    model.requery(function () {
        // TODO : place your code here
    });

}
