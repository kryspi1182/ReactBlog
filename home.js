import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    return ( 
        <div className="home-app">
            <h1>Welcome!</h1>
            <h2>Lorem ipsum</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in libero nulla. Aenean commodo rhoncus tortor eget mollis. Donec sollicitudin dapibus mauris, in eleifend erat aliquet a. Sed posuere, odio et sodales molestie, dui dui interdum felis, a iaculis ex metus in arcu. Suspendisse accumsan dolor at tortor auctor, sit amet tempus sapien ullamcorper. Ut id dignissim enim. Maecenas non eleifend ante. Nullam hendrerit porta libero, sed facilisis nunc maximus et. Fusce fermentum, tortor ut interdum aliquam, diam urna tincidunt lectus, non imperdiet mauris dolor nec purus. Aenean malesuada luctus nunc et suscipit. Duis malesuada tristique ex, non pretium nunc facilisis eget. Maecenas placerat finibus sagittis.
                Suspendisse ligula sem, convallis quis pretium et, blandit non risus. Duis vulputate pharetra nisi quis viverra. Mauris id magna imperdiet, ultricies erat vitae, molestie lorem. Sed auctor eros mi, ac rutrum lacus euismod et. Praesent non lacinia nisi, at dapibus enim. Quisque sed augue in mi pretium commodo. Phasellus imperdiet, lorem in finibus vulputate, felis nisl dapibus nunc, a facilisis ex nunc sit amet mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean justo dui, auctor nec suscipit ultricies, hendrerit nec urna. 
            </p>
            <FontAwesomeIcon icon={faSmile} size="6x"/>
        </div>
     );
}
 
export default Home;