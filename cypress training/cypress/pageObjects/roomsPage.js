class RoomsPage {

    elements = {
        roomsButton:() => cy.get('a').contains('Rooms')
    };

    selectRoom(){
        cy.log('Selecting Rooms from the navigation bar');
        this.elements.roomsButton().should('be.visible').click();
    }
}
export default new RoomsPage();