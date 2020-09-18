let MounthHeaderComp = {
    template: `
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner d-flex justify-content-center">
                <div class="carousel-item active">
                hola
                </div>
                <div class="carousel-item">
                como estas?
                </div>
                <div class="carousel-item">
                tuuuuu?
                </div>
            </div>
            <a class="carousel-control-prev colorIcon" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next colorIcon" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    `,
    data() {
        return {
            mounthArray: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'Dicember',
            ]
        }
    },
}