describe('FP Register controller', function () {

    var controller, scope;

    beforeEach(module("smartRegistry.controllers"));
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        controller = $controller("fpRegisterController", {
            $scope: scope
        });
    }));

    describe("filterByVillageName", function () {
        it("should filter clients by village name.", function () {
            var client = {
                name: "client1",
                village: "Village_name"
            };
            var matchingVillageOption = {
                label: "Village",
                id: "village_name",
                handler: "handler_name"
            };
            var nonMatchingVillageOption = {
                label: "Some other village",
                id: "some other village",
                handler: "some_other_handler_name"
            };

            expect(scope.filterByVillageName(client, matchingVillageOption)).toBeTruthy();
            expect(scope.filterByVillageName(client, nonMatchingVillageOption)).toBeFalsy();
        })
    });

    describe("sortByPriority", function () {
        it("should sort clients by high priority.", function () {
            var client = {
                name: "client1",
                isHighPriority: true
            };

            var sort = scope.sortByPriority(client);

            expect(sort).toBeFalsy();

            sort = scope.sortByPriority({
                name: "client1",
                isHighPriority: false
            });

            expect(sort).toBeTruthy();
        });
    });

    describe("filterByPriority", function () {
        it("should allow those clients which are high priority and not using any fp method.", function () {
            var client = {
                name: "client1",
                isHighPriority: true,
                fp_method: "none"
            };

            expect(scope.filterByPriority(client)).toBeTruthy();

            client = {
                name: "client2",
                isHighPriority: true,
                fp_method: "none"
            };

            expect(scope.filterByPriority(client)).toBeTruthy();
        });

        it("should filter those clients which are not high priority.", function () {
            var client = {
                name: "client1",
                isHighPriority: false,
                fp_method: "none"
            };

            expect(scope.filterByPriority(client)).toBeFalsy();
        });

        it("should filter those clients which are using a fp method.", function () {
            var client = {
                name: "client1",
                isHighPriority: true,
                fp_method: "condom"
            };

            expect(scope.filterByPriority(client)).toBeFalsy();
        });

        it("should change the content template to 'high priority without fp'.", function () {
            scope.contentTemplate = "default";
            var client = {
                name: "client1",
                isHighPriority: true,
                fp_method: "none"
            };

            scope.filterByPriority(client);

            expect(scope.contentTemplate).toBe("ec_without_fp");
        });
    });

    describe("filterByNumberOfChildrenGreaterThanOne", function () {
        it("should allow those clients who have more than one children and not using any fp method.", function () {
            var client = {
                name: "client1",
                num_living_children: "2",
                fp_method: "none"
            };

            expect(scope.filterByNumberOfChildrenGreaterThanOne(client)).toBeTruthy();

            client = {
                name: "client2",
                num_living_children: "3",
                fp_method: "none"
            };

            expect(scope.filterByNumberOfChildrenGreaterThanOne(client)).toBeTruthy();

            client = {
                name: "client3",
                num_living_children: "2",
                fp_method: ""
            };

            expect(scope.filterByNumberOfChildrenGreaterThanOne(client)).toBeTruthy();
        });

        it("should filter those clients who have less than two children.", function () {
            var client = {
                name: "client1",
                num_living_children: "1",
                fp_method: "none"
            };

            expect(scope.filterByNumberOfChildrenGreaterThanOne(client)).toBeFalsy();
        });

        it("should filter those clients which are using a fp method.", function () {
            var client = {
                name: "client1",
                num_living_children: "2",
                fp_method: "condom"
            };

            expect(scope.filterByNumberOfChildrenGreaterThanOne(client)).toBeFalsy();
        });

        it("should change the content template to 'high priority without fp'.", function () {
            scope.contentTemplate = "default";
            var client = {
                name: "client1",
                num_living_children: "2",
                fp_method: "none"
            };

            scope.filterByNumberOfChildrenGreaterThanOne(client);

            expect(scope.contentTemplate).toBe("ec_without_fp");
        });
    });

    describe("filterByNumberOfChildrenEqualToOne", function () {
        it("should allow those clients who have exactly one child and not using any fp method.", function () {
            var client = {
                name: "client1",
                num_living_children: "1",
                fp_method: "none"
            };

            expect(scope.filterByNumberOfChildrenEqualToOne(client)).toBeTruthy();

            client = {
                name: "client3",
                num_living_children: "1",
                fp_method: ""
            };

            expect(scope.filterByNumberOfChildrenEqualToOne(client)).toBeTruthy();
        });

        it("should filter those clients who do not have exactly one child.", function () {
            var client = {
                name: "client1",
                num_living_children: "2",
                fp_method: "none"
            };

            expect(scope.filterByNumberOfChildrenEqualToOne(client)).toBeFalsy();

            client = {
                name: "client2",
                num_living_children: "0",
                fp_method: "none"
            };

            expect(scope.filterByNumberOfChildrenEqualToOne(client)).toBeFalsy();
        });

        it("should filter those clients which are using a fp method.", function () {
            var client = {
                name: "client1",
                num_living_children: "1",
                fp_method: "iud"
            };

            expect(scope.filterByNumberOfChildrenEqualToOne(client)).toBeFalsy();
        });

        it("should change the content template to 'high priority without fp'.", function () {
            scope.contentTemplate = "default";
            var client = {
                name: "client1",
                num_living_children: "1",
                fp_method: "none"
            };

            scope.filterByNumberOfChildrenEqualToOne(client);

            expect(scope.contentTemplate).toBe("ec_without_fp");
        });
    });

    describe("filterByFPMethod", function () {
        it("should allow those clients who have same fp method as selected one.", function () {
            var client = {
                name: "client1",
                fp_method: "iud"
            };

            expect(scope.filterByFPMethod(client, "iud")).toBeTruthy();

            client = {
                name: "client3",
                fp_method: "dmpa_injectable"
            };

            expect(scope.filterByFPMethod(client, "dmpa_injectable")).toBeTruthy();
        });

        it("should filter those clients who have different fp method than the applied filter.", function () {
            var client = {
                name: "client1",
                fp_method: "none"
            };

            expect(scope.filterByFPMethod(client, "condom")).toBeFalsy();

            client = {
                name: "client2",
                fp_method: ""
            };

            expect(scope.filterByFPMethod(client, "condom")).toBeFalsy();

            client = {
                name: "client2",
                fp_method: "iud"
            };

            expect(scope.filterByFPMethod(client, "condom")).toBeFalsy();
        });

        it("should change the content template to 'fp_methods'.", function () {
            scope.contentTemplate = "default";
            var client = {
                name: "client1",
                fp_method: "condom"
            };

            scope.filterByFPMethod(client, "condom");

            expect(scope.contentTemplate).toBe("fp_methods");
        });
    });

    describe("filterByFPMethodOther", function () {
        it("should allow those clients who have 'other' fp methods.", function () {
            var client = {
                name: "client1",
                fp_method: "lam"
            };

            expect(scope.filterByFPMethodOther(client)).toBeTruthy();

            client = {
                name: "client2",
                fp_method: "traditional"
            };

            expect(scope.filterByFPMethodOther(client)).toBeTruthy();

            client = {
                name: "client3",
                fp_method: "centchroman"
            };

            expect(scope.filterByFPMethodOther(client)).toBeTruthy();
        });

        it("should filter those clients who have different fp method than 'other' methods.", function () {
            var client = {
                name: "client1",
                fp_method: "none"
            };

            expect(scope.filterByFPMethodOther(client)).toBeFalsy();

            client = {
                name: "client2",
                fp_method: ""
            };

            expect(scope.filterByFPMethodOther(client)).toBeFalsy();

            client = {
                name: "client2",
                fp_method: "condom"
            };

            expect(scope.filterByFPMethodOther(client)).toBeFalsy();
        });

        it("should change the content template to 'fp_methods'.", function () {
            scope.contentTemplate = "default";
            var client = {
                name: "client1",
                fp_method: "condom"
            };

            scope.filterByFPMethodOther(client);

            expect(scope.contentTemplate).toBe("fp_methods");
        });
    });

    describe("filterFPMethod", function () {
        it("should set service mode to the one selected.", function () {
            scope.serviceModeOption = {};
            var option = {
                label: "Service mode 1",
                id: "service_mode_1",
                handler: "handler_1"
            };

            scope.filterFPMethod(option);

            expect(scope.serviceModeOption).toBe(option);
        });
    });

    describe("selectFPMethodOption", function () {
        it("should set corresponding options as selected based on the selected fp method options.", function () {
            scope.selectFPMethodOption(true);

            expect(scope.isFPMethodsOptionSelected).toBeTruthy();
            expect(scope.isFPPrioritizationOptionSelected).toBeFalsy();

            scope.selectFPMethodOption(false);

            expect(scope.isFPMethodsOptionSelected).toBeFalsy();
            expect(scope.isFPPrioritizationOptionSelected).toBeTruthy();
        });
    });

    describe("onFPModalOptionClick", function () {
        it("should close the FP modal once the click is handled.", function () {
            scope.isFPModalOpen = true;

            scope.onFPModalOptionClick({
                label: "Condom",
                id: "condom",
                handler: "filterByFPMethod"
            }, "filterFPMethod");

            expect(scope.isFPModalOpen).toBeFalsy();
        });
    });

    describe("openFPModal", function () {
        it("should open FP modal and close other modals.", function () {
            var option = {
                label: "Condom",
                id: "condom",
                handler: "filterByFPMethod"
            };

            scope.openFPModal(option);

            expect(scope.isFPModalOpen).toBeTruthy();
            expect(scope.isModalOpen).toBeFalsy();
            expect(scope.currentFPOption).toBe(option);
        });
    });

    describe("searchCriteria", function () {
        it("should allow client which matches search criteria.", function () {
            var client = {
                name: "asha",
                ec_number: "1234",
                thayi: "6789"
            };

            expect(scope.searchCriteria(client, "a")).toBeTruthy();
            expect(scope.searchCriteria(client, "asha")).toBeTruthy();
            expect(scope.searchCriteria(client, "1")).toBeTruthy();
            expect(scope.searchCriteria(client, "1234")).toBeTruthy();
            expect(scope.searchCriteria(client, "6")).toBeTruthy();
            expect(scope.searchCriteria(client, "6789")).toBeTruthy();
        });

        it("should filter clients which do not match search criteria.", function () {
            var client = {
                name: "asha",
                ec_number: "1234",
                thayi: "6789"
            };

            expect(scope.searchCriteria(client, "asha rani")).toBeFalsy();
            expect(scope.searchCriteria(client, "12345")).toBeFalsy();
        });
    });
});