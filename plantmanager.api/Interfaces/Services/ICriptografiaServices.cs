
namespace Interfaces.Services
{
    public interface ICriptografiaServices
    {
        string CriarHashSenha(string senha);
        bool VerificarSenha(string senhaDigitada, string hashSenha);
    }
}