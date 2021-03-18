using DatingApp.API.Interfaces;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using System.Collections.Generic;

namespace DatingApp.API.Controllers
{
    [Authorize]
    public class MessagesController : BaseApiController
    {
        private readonly IDatingRepository _repo;
        private readonly IMessageRepository _messageRepo;
        private readonly IMapper _mapper;
        public MessagesController(IDatingRepository repo, IMessageRepository messageRepo, IMapper mapper)
        {
            _mapper = mapper;
            _messageRepo = messageRepo;
            _repo = repo;

        }

        [HttpPost()]
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
        {
            var username = User.GetUsername();

            if (username == createMessageDto.RecipientUsername.ToLower())
                return BadRequest("You cannot send message to yourself");
            
            var sender = await _repo.GetByUsername(username);
            var recipient = await _repo.GetByUsername(createMessageDto.RecipientUsername);

            if (recipient == null) return NotFound();

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.Username,
                RecipientUsername = recipient.Username,
                Content = createMessageDto.Content
            };

            _messageRepo.AddMessage(message);

            if(await _messageRepo.SaveAllAsync()) return Ok(_mapper.Map<MessageDto>(message));

            return BadRequest("Failed to send message");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageForUser([FromQuery]MessageParams messageParams)
        {
            messageParams.Username = User.GetUsername();

            var messages = await _messageRepo.GetMessageForUser(messageParams);

            Response.AddPagenationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages);

            return messages;
        }

        [HttpGet("thread/{username}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread(string username)
        {
            var currentUsername = User.GetUsername();

            return Ok(await _messageRepo.GetMessageThread(currentUsername, username));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DaleteMessage(int id)
        {
            var usermame = User.GetUsername();

            var message =  await _messageRepo.GetMessage(id);

            if (message.Sender.Username != usermame && message.Recipient.Username != usermame) return Unauthorized();

            if (message.Sender.Username == usermame) message.SenderDeleted = true;

            if (message.Recipient.Username == usermame) message.RecipientDeleted = true;

            if (message.SenderDeleted && message.RecipientDeleted) _messageRepo.DeleteMessage(message);

            if (await _messageRepo.SaveAllAsync()) return Ok();

            return BadRequest("Problem in Deleting the Message");
        }
    }
}